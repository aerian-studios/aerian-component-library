import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AerAccordion } from "./index";
import {
  AerAccordionContent,
  AerAccordionHeader,
  AerAccordionItem,
} from "./AerAccordion";

describe("AerAccordion", () => {
  it("should render correctly", () => {
    const { container } = render(
      <AerAccordion type="multiple">
        <AerAccordionItem value="item-1">
          <AerAccordionHeader>Header 1</AerAccordionHeader>
          <AerAccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordionContent>
        </AerAccordionItem>
        <AerAccordionItem value="item-2">
          <AerAccordionHeader>Header 2</AerAccordionHeader>
          <AerAccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordionContent>
        </AerAccordionItem>
        <AerAccordionItem value="item-3">
          <AerAccordionHeader>Header 3</AerAccordionHeader>
          <AerAccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordionContent>
        </AerAccordionItem>
      </AerAccordion>
    );
    expect(container).toMatchSnapshot();

    expect(
      screen.getByRole("heading", { name: "Heading 1", level: 3 })
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Heading 2", level: 3 })
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Heading 3", level: 3 })
    ).toBeDefined();
  });

  it("should render heading overrides correctly", () => {
    const { container } = render(
      <AerAccordion type="multiple">
        <AerAccordionItem value="item-1">
          <AerAccordionHeader headingLevel="h2">Header 1</AerAccordionHeader>
          <AerAccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordionContent>
        </AerAccordionItem>
      </AerAccordion>
    );

    expect(
      screen.getByRole("heading", { name: "Heading 1", level: 3 })
    ).not.toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Heading 1", level: 2 })
    ).toBeDefined();
  });
});
