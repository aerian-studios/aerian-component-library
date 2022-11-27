import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AerCheckbox } from "./index";

describe("AerCheckbox", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly given just label and value", () => {
    const { container } = render(
      <AerCheckbox label="checkbox label" value="sut" />
    );
    expect(container).toMatchSnapshot();

    const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });
    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute("checked")).toBeNull();
    expect(screen.queryByRole("status")).toBeFalsy();
  });

  it("should render checked by default when passed the `defaultState` prop", () => {
    render(
      <AerCheckbox label="checkbox label" value="sut" defaultState={true} />
    );

    const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });
    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute("checked")).toBeDefined();
    expect(checkbox.getAttribute("indeterminate")).toBeNull();
    expect(screen.queryByRole("status")).toBeFalsy();
  });

  it("should render `indeterminate` by default when passed the `defaultState` prop", () => {
    render(
      <AerCheckbox
        label="checkbox label"
        value="sut"
        defaultState="indeterminate"
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });
    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute("checked")).toBeNull();
    expect(checkbox.getAttribute("indeterminate")).toBeDefined();
    expect(screen.queryByRole("status")).toBeFalsy();
  });

  describe("clicking", () => {
    it("should respond to clicking both input and label", async () => {
      const onChangeMock = vi.fn();
      render(
        <AerCheckbox
          label="checkbox label"
          value="sut"
          defaultState={false}
          onChange={onChangeMock}
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });
      const label = screen.getByText("checkbox label");

      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(checkbox.getAttribute("indeterminate")).toBeNull();
      expect(onChangeMock).not.toHaveBeenCalled();

      await userEvent.click(checkbox);
      expect(checkbox.getAttribute("checked")).toBeDefined();
      expect(onChangeMock).toHaveBeenCalledTimes(1);

      await userEvent.click(label);
      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(onChangeMock).toHaveBeenCalledTimes(2);
    });

    it("should respond to clicking if `indeterminate` is set", async () => {
      const onChangeMock = vi.fn();
      render(
        <AerCheckbox
          label="checkbox label"
          value="sut"
          defaultState="indeterminate"
          onChange={onChangeMock}
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });
      const label = screen.getByText("checkbox label");

      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(checkbox.getAttribute("indeterminate")).toBeDefined();
      expect(onChangeMock).not.toHaveBeenCalled();

      await userEvent.click(checkbox);
      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(checkbox.getAttribute("indeterminate")).toBeDefined();
      expect(onChangeMock).toHaveBeenCalledTimes(1);

      await userEvent.click(label);
      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(checkbox.getAttribute("indeterminate")).toBeDefined();
      expect(onChangeMock).toHaveBeenCalledTimes(2);
    });
  });

  describe("blurring", () => {
    it("should respond to blurring and apply validity as appropriate", async () => {
      const onBlurMock = vi.fn();
      render(
        <AerCheckbox
          label="checkbox label"
          value="sut"
          defaultState={false}
          required
          onBlur={onBlurMock}
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });

      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(screen.queryByRole("status")).toBeFalsy();
      expect(onBlurMock).not.toHaveBeenCalled();

      await userEvent.click(checkbox);
      expect(checkbox.getAttribute("checked")).toBeDefined();
      expect(onBlurMock).not.toHaveBeenCalled();

      await userEvent.tab();
      expect(onBlurMock).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("status")).toBeFalsy();

      await userEvent.click(checkbox);
      expect(checkbox.getAttribute("checked")).toBeDefined();
      expect(screen.queryByRole("status")).toBeFalsy();

      await userEvent.tab();
      expect(onBlurMock).toHaveBeenCalledTimes(2);
      expect(screen.queryByRole("status")).toBeDefined();
    });

    it("should respond to correction of validity immediately and not wait for blur", async () => {
      render(
        <AerCheckbox
          label="checkbox label"
          value="sut"
          defaultState={false}
          required
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });

      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(screen.queryByRole("status")).toBeFalsy();

      await userEvent.click(checkbox);
      await userEvent.click(checkbox);
      expect(checkbox.getAttribute("checked")).toBeNull();
      expect(screen.queryByRole("status")).toBeFalsy();

      await userEvent.tab();
      expect(screen.queryByRole("status")).toBeDefined();

      // checking the checkbox immediately remove the error
      await userEvent.click(checkbox);
      expect(checkbox.getAttribute("checked")).toBeDefined();
      expect(screen.queryByRole("status")).toBeFalsy();
    });
  });

  describe("overrides", () => {
    it("should render an error state if the `errorMessage` prop is passed in", async () => {
      render(
        <AerCheckbox label="checkbox title" value="sut" errorMessage="Oh no!" />
      );

      expect(
        screen.getByRole("status", {
          name: `There is an error with the field, "checkbox title"`,
        })
      ).toBeDefined();
    });

    it("should hide the label but remain accessible to screen readers when using `LabelProps`", async () => {
      render(
        <AerCheckbox
          label={{ name: "checkbox label", hidden: true }}
          value="sut"
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: "checkbox label" });

      expect(checkbox).toBeDefined();
      // Don't have the jest testing library's `toBeVisible` assertion
      expect(screen.getByText("checkbox label").clientWidth).toBe(0);
      expect(screen.getByText("checkbox label").clientHeight).toBe(0);
    });
  });
});
