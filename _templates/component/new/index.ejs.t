---
to: src/components/<%= h.changeCase.camel(name) %>/index.tsx
---
export { <%= h.changeCase.pascal(name) %> } from "./<%= h.changeCase.pascal(name) %>"