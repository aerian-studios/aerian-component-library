const pkgRoot = process.cwd();
const path = require("path");

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        // Add a new file
        type: "add",
        // Path for the new file
        path: path.join(
          pkgRoot,
          "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx"
        ),
        // Handlebars template used to generate content of new file
        templateFile: path.join(
          __dirname,
          "generator-templates/Component/Component.tsx.hbs"
        ),
      },
      {
        // Add a new file
        type: "add",
        // Path for the new file
        path: path.join(
          pkgRoot,
          "src/components/{{pascalCase name}}/{{pascalCase name}}.spec.tsx"
        ),
        // Handlebars template used to generate content of new file
        templateFile: path.join(
          __dirname,
          "generator-templates/Component/Component.spec.tsx.hbs"
        ),
      },
      {
        // Add a new file
        type: "add",
        // Path for the new file
        path: path.join(
          pkgRoot,
          "src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx"
        ),
        // Handlebars template used to generate content of new file
        templateFile: path.join(
          __dirname,
          "generator-templates/Component/Component.stories.tsx.hbs"
        ),
      },
      {
        // Add a new file
        type: "add",
        // Path for the new file
        path: path.join(
          pkgRoot,
          "src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss"
        ),
        // Handlebars template used to generate content of new file
        templateFile: path.join(
          __dirname,
          "generator-templates/Component/Component.modules.scss.hbs"
        ),
      },
      {
        // Add a new file
        type: "add",
        // Path for the new file
        path: path.join(pkgRoot, "src/components/{{pascalCase name}}/index.ts"),
        // Handlebars template used to generate content of new file
        templateFile: path.join(
          __dirname,
          "generator-templates/Component/index.ts.hbs"
        ),
      },
      {
        // Adds an index.ts file if it does not already exist
        type: "add",
        path: path.join(pkgRoot, "src/components/index.ts"),
        templateFile: path.join(
          __dirname,
          "generator-templates/injectable-index.ts.hbs"
        ),
        // If index.ts already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: "append",
        path: path.join(pkgRoot, "src/components/index.ts"),
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import { {{pascalCase name}} } from "./{{pascalCase name}}";`,
      },
      {
        type: "append",
        path: path.join(pkgRoot, "src/components/index.ts"),
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });

  /* @TODO */
  plop.setGenerator("context", {
    description: "Create a context",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the context?",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(pkgRoot, "src/context/{{camelCase name}}.ts"),
        templateFile: path.join(
          __dirname,
          "generator-templates/context.ts.hbs"
        ),
      },
      {
        type: "add",
        path: path.join(pkgRoot, "src/context/index.ts"),
        templateFile: path.join(
          __dirname,
          "generator-templates/injectable-index.ts.hbs"
        ),
        skipIfExists: true,
      },
      {
        type: "append",
        path: path.join(pkgRoot, "src/context/index.ts"),
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from "./{{camelCase name}}";`,
      },
      {
        type: "append",
        path: path.join(pkgRoot, "src/context/index.ts"),
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{camelCase name}},`,
      },
    ],
  });

  /* @TODO */
  plop.setGenerator("hook", {
    description: "Create a custom react hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your hook name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/hooks/{{camelCase name}}.ts",
        templateFile: path.join(__dirname, "generator-templates/hook.ts.hbs"),
      },
      {
        type: "add",
        path: path.join(pkgRoot, "src/hooks/index.ts"),
        templateFile: path.join(
          __dirname,
          "generator-templates/injectable-index.ts.hbs"
        ),
        skipIfExists: true,
      },
      {
        type: "append",
        path: path.join(pkgRoot, "src/hooks/index.ts"),
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from "./{{camelCase name}}"`,
      },
      {
        type: "append",
        path: path.join(pkgRoot, "src/hooks/index.ts"),
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{camelCase name}},`,
      },
    ],
  });
};
