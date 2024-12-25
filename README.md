# fix-verbatim-module-syntax

CLI tool to auto-fix [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/verbatimModuleSyntax.html) errors in your TypeScript project:

```
error TS1484: 'SomeType' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
```

### Why?

`verbatimModuleSyntax` is a TypeScript config introduced in [v5](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#--verbatimmodulesyntax). Enabling it is highly recommended as it enforces explicit type imports/exports, ensuring predictable compilation.

Previously, TypeScript automatically detected and removed type-only imports/exports during compilation. But this could lead to runtime issues if the imported modules had side effects. To address this, `verbatimModuleSyntax` was introduced to require explicitly marked type imports/exports, making the code more maintainable and resilient against unexpected behavior during compilation.

However, enabling `verbatimModuleSyntax` may initially produce many errors related to missing type annotations. Fixing these manually can be tedious so this command-line tool automates the process for you.

<br>

<p align="center">
	<a href="https://github.com/sponsors/privatenumber/sponsorships?tier_id=398771"><img width="412" src="https://raw.githubusercontent.com/privatenumber/sponsors/master/banners/assets/donate.webp"></a>
	<a href="https://github.com/sponsors/privatenumber/sponsorships?tier_id=416984"><img width="412" src="https://raw.githubusercontent.com/privatenumber/sponsors/master/banners/assets/sponsor.webp"></a>
</p>

## Usage

Ensure TypeScript v5 is installed in your project, then run the following command in the project directory, specifying the path to your `tsconfig.json`.

> [!WARNING]
> This command will modify your files. Be sure to back up or commit your changes beforehand.

```sh
npx fix-verbatim-module-syntax ./tsconfig.json
```

After running the command, add [`"verbatimModuleSyntax": true`](https://www.typescriptlang.org/tsconfig/verbatimModuleSyntax.html) to your `tsconfig.json`.

### Dry-run Mode

To preview changes without modifying files, use the `--dry` flag:

```sh
npx fix-verbatim-module-syntax --dry ./tsconfig.json
```

## Sponsors

<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
