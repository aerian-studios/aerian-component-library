import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { AerAccordion } from "./index";
import {
  AerAccordionContent,
  AerAccordionHeader,
  AerAccordionItem,
} from "./AerAccordion";

describe("AerAccordion", () => {
  afterEach(() => {
    cleanup();
  });

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
      screen.getByRole("heading", { name: "Header 1", level: 3 })
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Header 2", level: 3 })
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Header 3", level: 3 })
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
      screen.queryByRole("heading", { name: "Header 1", level: 3 })
    ).toBeNull();
    expect(
      screen.getByRole("heading", { name: "Header 1", level: 2 })
    ).toBeDefined();
  });
});
