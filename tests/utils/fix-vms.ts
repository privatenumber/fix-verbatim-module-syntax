import path from 'node:path';
import spawn, { type SubprocessError } from 'nano-spawn';

const fixVmsPath = path.resolve('./dist/cli.mjs');

export const fixVms = (
	cwd: string,
) => spawn(fixVmsPath, [], {
	cwd,
	env: {
		...process.env,
		NO_COLOR: '1',
	},
}).catch(error => error as SubprocessError);
