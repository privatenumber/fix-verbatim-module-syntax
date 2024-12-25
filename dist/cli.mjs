#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import MagicString from 'magic-string';
import { cli } from 'cleye';
import { cyan, magenta } from 'kolorist';

var name = "fix-verbatimModuleSyntax";
var version = "0.0.0-semantic-release";

const parseTsconfig = (tsconfigPath) => {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(ts.formatDiagnostic(configFile.error, ts.createCompilerHost({})));
  }
  const parsedCommandLine = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath)
  );
  if (parsedCommandLine.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(parsedCommandLine.errors, ts.createCompilerHost({})));
  }
  return parsedCommandLine;
};
const fixVerbatimModuleSyntax = (tsconfigPath) => {
  const resolvedTsconfigPath = ts.sys.resolvePath(tsconfigPath);
  if (!ts.sys.fileExists(resolvedTsconfigPath)) {
    throw new Error(`tsconfig not found: ${resolvedTsconfigPath}`);
  }
  const tsconfig = parseTsconfig(resolvedTsconfigPath);
  const options = {
    ...tsconfig?.options,
    skipLibCheck: true,
    module: ts.ModuleKind.Preserve,
    verbatimModuleSyntax: true
  };
  const program = ts.createProgram({
    rootNames: tsconfig.fileNames,
    options
  });
  const files = /* @__PURE__ */ new Map();
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length === 0) {
    return files;
  }
  for (const {
    code,
    file,
    start,
    length
  } of diagnostics) {
    if (
      // Import verbatimModuleSyntax errors
      code === 1484 || code === 1205
    ) {
      const { text, fileName } = file;
      let found = files.get(fileName);
      if (!found) {
        found = {
          ms: new MagicString(text),
          importNames: []
        };
        files.set(fileName, found);
      }
      const importName = text.slice(start, start + length);
      found.importNames.push(importName);
      found.ms.appendLeft(start, "type ");
    }
  }
  return files;
};
(async () => {
  const argv = cli({
    name,
    version,
    parameters: ["[tsconfig path]"],
    flags: {
      dry: {
        type: Boolean,
        description: "Print changes without writing to disk"
      }
    }
  });
  const tsconfigPath = argv._.tsconfigPath ?? "tsconfig.json";
  const fixes = fixVerbatimModuleSyntax(tsconfigPath);
  const { dry } = argv.flags;
  const cwd = process.cwd();
  for (const [filePath, { ms, importNames }] of fixes) {
    if (!dry) {
      fs.writeFileSync(filePath, ms.toString());
    }
    console.log(cyan(path.relative(cwd, filePath)));
    console.log(
      "  ",
      dry ? "Should add type to:" : "Adding type to:",
      importNames.map(magenta).join(", ")
    );
    console.log();
  }
})().catch((error) => {
  process.exitCode = 1;
  console.error("Error:", error.message);
});
