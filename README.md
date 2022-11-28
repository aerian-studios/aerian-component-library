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

There are generators to quickly output the files and boilerplate that you need to output a component:

```bash
yarn generate

# or npm

npm run generate
```

All components should have tests, a story, some local theming. Largely speaking the development and documentation of a component occurs in storybooks. This encourages thinking about the the component in isolation.

### Developing locally 

<hr />

The repository contains storybooks for building and testing new components. There is also a simple `main.tsx` to allow you to test adding classes.