import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import MagicString from 'magic-string';
import { cli } from 'cleye';
import { cyan, magenta } from 'kolorist';
import { name, version } from '../package.json';

const parseTsconfig = (
	tsconfigPath: string,
) => {
	const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
	if (configFile.error) {
		throw new Error(ts.formatDiagnostic(configFile.error, ts.createCompilerHost({})));
	}

	const parsedCommandLine = ts.parseJsonConfigFileContent(
		configFile.config,
		ts.sys,
		path.dirname(tsconfigPath),
	);

	if (parsedCommandLine.errors.length > 0) {
		throw new Error(ts.formatDiagnostics(parsedCommandLine.errors, ts.createCompilerHost({})));
	}

	return parsedCommandLine;
};

const fixVerbatimModuleSyntax = (
	tsconfigPath: string,
) => {
	const resolvedTsconfigPath = ts.sys.resolvePath(tsconfigPath);
	if (!ts.sys.fileExists(resolvedTsconfigPath)) {
		/**
		 * It's possible to type check without a tsconfig but
		 * we have to gather the files ourselves and may over-reach.
		 * Better to expect a tsconfig with correct includes/exlcudes
		 * and resolution settings
		 */
		throw new Error(`tsconfig not found: ${resolvedTsconfigPath}`);
	}

	const tsconfig = parseTsconfig(resolvedTsconfigPath);
	const options: ts.CompilerOptions = {
		...tsconfig?.options,
		skipLibCheck: true,
		module: ts.ModuleKind.Preserve,
		verbatimModuleSyntax: true,
	};

	const program = ts.createProgram({
		rootNames: tsconfig.fileNames,
		options,
	});

	/**
	 * The same file may have multiple errors, so we need to store them
	 * make changes to them in batches, and save when we're done
	 */
	const files = new Map<string, {
		ms: MagicString;
		importNames: string[];
	}>();

	// Run type checking
	const diagnostics = ts.getPreEmitDiagnostics(program);
	if (diagnostics.length === 0) {
		return files;
	}

	for (const {
		code, file, start, length,
	} of diagnostics) {
		if (
			// Import verbatimModuleSyntax errors
			code === 1484

			// Re-export type verbatimModuleSyntax errors
			|| code === 1205
		) {
			const { text, fileName } = file!;
			let found = files.get(fileName);
			if (!found) {
				found = {
					ms: new MagicString(text),
					importNames: [],
				};
				files.set(fileName, found);
			}

			const importName = text.slice(start!, start! + length!);
			found.importNames.push(importName);
			found.ms.appendLeft(start!, 'type ');
		}
	}

	return files;
};

(async () => {
	const argv = cli({
		name,
		version,
		parameters: ['[tsconfig path]'],
		flags: {
			dry: {
				type: Boolean,
				description: 'Print changes without writing to disk',
			},
		},
	});

	const tsconfigPath = argv._.tsconfigPath ?? 'tsconfig.json';
	const fixes = fixVerbatimModuleSyntax(tsconfigPath);

	const { dry } = argv.flags;
	const cwd = process.cwd();
	for (const [filePath, { ms, importNames }] of fixes) {
		if (!dry) {
			fs.writeFileSync(filePath, ms.toString());
		}

		console.log(cyan(path.relative(cwd, filePath)));
		console.log(
			'  ',
			dry
				? 'Should add type to:'
				: 'Adding type to:',
			importNames.map(magenta).join(', '),
		);
		console.log();
	}
})().catch((error) => {
	process.exitCode = 1;
	console.error('Error:', error.message);
});
