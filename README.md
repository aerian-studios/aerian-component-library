# Aerated - Component Library

## Installation

TODO This is coming while we decide how best to manage versioning. See below for local development.

<!--
```bash
npm install --save @aerian-studios/aerated@0.0.1
# or
yarn add @aerian-studios/aerated@0.0.1
``` -->

## Usage

TODO

## Form

TODO

## Developing the component library

Please install the recommended addons for vscode (if you are using it) or add a [Rome plugin](https://rome.tools/) and [conventional commit workflow](<(https://www.conventionalcommits.org/en/v1.0.0/)>).

### Installing

```bash
yarn && yarn prepare
```

## Work flow

There are generators to quickly output the files and boilerplate that you need to output a component:

```bash
yarn generate

# or npm

npm run generate
```

All components should have tests, a story, some local theming. Largely speaking the development and documentation of a component occurs in storybooks. This encourages thinking about the the component in isolation.

The repository contains storybooks for building and testing new components. There is also a simple `main.tsx` to allow you to test adding classes.

## Committing

1. When committing please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) so that changes can be correctly versioned
2. A pre-commit hook will run that will automatically fix safe linting and formatting issues

## Pull requests

todo PRs require at least 1 reviewer. There is a Github actions workflow that will:

- build the package,
- adjust the package version,
- output a changelog,
- build storybook,
- deploy to github pages,
- and merge code into `origin/main`

## [Using themes and local styles](./src/styles/README.md)
