import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AerAccordion } from "./index";

describe("AerAccordion", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly", () => {
    const { container } = render(
      <AerAccordion.Root type="multiple">
        <AerAccordion.Item value="item-1">
          <AerAccordion.Header>Header 1</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
        <AerAccordion.Item value="item-2">
          <AerAccordion.Header>Header 2</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
        <AerAccordion.Item value="item-3">
          <AerAccordion.Header>Header 3</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
      </AerAccordion.Root>
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

  it("should render the multiple variant by default", async () => {
    const { container } = render(
      <AerAccordion.Root>
        <AerAccordion.Item value="item-1">
          <AerAccordion.Header>Header 1</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
        <AerAccordion.Item value="item-2">
          <AerAccordion.Header>Header 2</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
        <AerAccordion.Item value="item-3">
          <AerAccordion.Header>Header 3</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
      </AerAccordion.Root>
    );
    expect(container).toMatchSnapshot();

    const headder1Trigger = screen.getByRole("button", { name: "Header 1" });
    const headder2Trigger = screen.getByRole("button", { name: "Header 2" });

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("false");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("false");

    await userEvent.click(headder1Trigger);

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("true");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("false");

    await userEvent.click(headder2Trigger);

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("true");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("true");

    await userEvent.click(headder2Trigger);

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("true");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should render the single variant when passed as a prop", async () => {
    const { container } = render(
      <AerAccordion.Root type="single">
        <AerAccordion.Item value="item-1">
          <AerAccordion.Header>Header 1</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
        <AerAccordion.Item value="item-2">
          <AerAccordion.Header>Header 2</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
        <AerAccordion.Item value="item-3">
          <AerAccordion.Header>Header 3</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
      </AerAccordion.Root>
    );
    expect(container).toMatchSnapshot();

    const headder1Trigger = screen.getByRole("button", { name: "Header 1" });
    const headder2Trigger = screen.getByRole("button", { name: "Header 2" });

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("false");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("false");

    await userEvent.click(headder1Trigger);

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("true");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("false");

    await userEvent.click(headder2Trigger);

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("false");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("true");

    await userEvent.click(headder1Trigger);

    expect(headder1Trigger.getAttribute("aria-expanded")).toBe("true");
    expect(headder2Trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should render heading overrides correctly", () => {
    const { container } = render(
      <AerAccordion.Root type="multiple">
        <AerAccordion.Item value="item-1">
          <AerAccordion.Header headingLevel="h2">Header 1</AerAccordion.Header>
          <AerAccordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AerAccordion.Content>
        </AerAccordion.Item>
      </AerAccordion.Root>
    );

    expect(
      screen.queryByRole("heading", { name: "Header 1", level: 3 })
    ).toBeNull();
    expect(
      screen.getByRole("heading", { name: "Header 1", level: 2 })
    ).toBeDefined();
  });
});
