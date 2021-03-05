---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.story.tsx
---
import React from "react";
import { <%= h.changeCase.pascal(name) %> } from "./";

export default { 
    title: "<%= h.changeCase.pascal(name) %>"
}

export const <%= h.changeCase.camel(name) %> = () => <<%= h.changeCase.pascal(name) %> />;
