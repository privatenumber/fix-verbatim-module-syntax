import { describe, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { fixVms } from './utils/fix-vms.js';

const basicTypeImport = {
	'tsconfig.json': '{}',
	'index.ts': 'import { a, b } from \'./file\'; export { a }; export { b } from \'./file\';',
	'file.ts': 'export type a = 1; export type b = 2',
};

describe('fix-verbatimModuleSyntax', ({ describe, test }) => {
	describe('Error cases', ({ test }) => {
		test('Fails if no tsconfig', async () => {
			await using fixture = await createFixture();

			const gitPublishProcess = await fixVms(fixture.path);

			expect(('exitCode' in gitPublishProcess) && gitPublishProcess.exitCode).toBe(1);
			expect(gitPublishProcess.stderr).toMatch('Error: tsconfig not found:');
		});
	});

	test('Converts to type imports', async () => {
		await using fixture = await createFixture(basicTypeImport);

		const vms = await fixVms(fixture.path);
		expect(vms.stdout).toMatch('Adding type to: a, b');

		const content = await fixture.readFile('index.ts', 'utf8');
		expect(content).toBe('import { type a, type b } from \'./file\'; export { type a }; export { type b } from \'./file\';');
	});
});
