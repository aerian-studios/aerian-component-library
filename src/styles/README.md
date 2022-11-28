# Themes & locally scoped files

## Global themes

The files in this directory `./styles` are largely straight (s)css files to be used to set only global theme variables and a couple of element settings. Largely speaking there should be no need to select raw HTML elements anywhere else in the stylesheets because we are using (s)css modules, whose preferred methodology is to add a class to elements that need styling.

The purpose of these files is to provide:

1. A quick way to edit the values that, from experience, are most likely to change from project to project
2. A quick way for those values to propagate through all your code
3. Provide "design tokens", which are a shared language with which to describe your styles. For example, if you wanted to add some spacing below an element, rather than putting a `margin-bottom: 24px`, which would be very hard to maintain, you can use the token for "spacing", which is based around the spacing rhythm defined by the designers, `margin-bottom: var(--s-3);`. This methodology brings soo many benefits from re-usability, ease of styling responsively all the way to speeding up design and processing design...

## Using the global theme

1. Import the `./styles/index.scss` into your initial file (`index.html` for parcel/vite projects, `index.tsx|jsx|js|ts`).
2. Set the variables according to the style guide provided by design.
3. Use the design tokens (see scoping below) to describe your styles (as distinct from the un-attributed CSS variables or random values).

### Anatomy of the global theme

The theme files are roughly split up into 7 areas (1 file for each). All CSS variables (custom properties) associated with, say colour, would be set in the `./styles/_colors.scss` file. Within the file there are 2 types of CSS variable and 2 types of variable.

#### Types of variable

Due to the usage of SCSS, we have access to SASS variables, which we use strictly as variables to be used in that file only. This is so that we don't find ourselves having to import files all over the place (and falling into some of the traps that this brings). The one exception to this rule is the `./src/_breakpoints.scss` file. The reason for that is that CSS variables cannot currently be used in the media query parameters, though they are excellent for use within the media query rule set!

The other type of variable is CSS variables ([Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)). The beauty of CSS variables is manifold:

1. They are scoped by default (all the theme styles are scoped to the lowest specificity possible, `:root`), so we can easily provide more specific scope to override them.
2. They can be set to different values in media queries, which allows, e.g. spacing variables to mutate depending on the screen size.
3. The are available globally
4. They can be read and set by JavaScript

#### Anatomy of a variable name

Because we have variables that will be used globally and which will be used outside of the scope in which it is declared or even implemented, it is important that the name conveys information efficiently. In our case we have some variables that are intended as global and some that are intended to be more specifically scoped (local themes).

The shape of the variable names is fixed

| Type | Category | Scope [& name]           | [State]  | Description                                                          |
| ---- | -------- | ------------------------ | -------- | -------------------------------------------------------------------- |
| `--` | `c`      | `-body`                  |          | Body colour                                                          |
| `--` | `c`      | `-body-bg`               |          | Body background colour                                               |
| `--` | `c`      | `-input-bg`              | `-hover` | Input background colour on hover                                     |
| `--` | `s`      | `-cmp-accordion-padding` |          | Accordion component (`cmp-accordion`) padding space                  |
| `$`  | `c`      | `-luminous-vivid-orange` |          | Luminous vivid orange colour - no scope means that it is not a token |

## (S)CSS modules

CSS module files are almost exactly like normal css files, except that the styles declared in them are scoped locally so that they can never clash with the styles in another CSS module file. That means that naming your classes can be short and to the point, `.heading`, `.link`, etc and it will not clash with the same class names in another file.

### Some pointers for CSS modules

CSS module file names end in `*.module.css/scss`.

1. Make class names simple and descriptive within the context they are used
2. Use `camelCase` for class names.
3. Always use a class name rather than an HTML element selector
4. Class name plus attribute selectors are fine! E.g. `.menuButton[aria-expanded=true]`
5. Please do not nest styles if you can help it.
6. Use `composes` to re-use styles from other files, especially the modules in the `./styles` folder or for atomic css rules.

### Using CSS modules

1. There should be a CSS module per component, named the same as the component. There may be occasions where multiple components share the same CSS module, but usually each component will have its own.
2. Import the module in the component like this `import styles, { specificStyle } from "./MyComponent.module.scss`.
3. Use the styles as classNames, e.g. `<button className={styles.specialButton}>Special button</button>`.

## Local themes

todo
