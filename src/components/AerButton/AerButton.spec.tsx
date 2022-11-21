import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import { AerButton } from "./index";
import { AerButtonVariants } from "./AerButton";
import { act } from "react-dom/test-utils";

describe("AerButton", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("should render correctly", () => {
    const { container } = render(<AerButton disabled={false} />);

    expect(screen.getByRole(/button/)).toBeDefined();
    expect(screen.getByRole(/button/).getAttribute("disabled")).toBeNull();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="_default_e76392"
        />
      </div>
    `);
  });

  it("should be disabled when passed the disabled prop", () => {
    const { container } = render(<AerButton disabled={true} />);

    expect(screen.getByRole(/button/)).toBeDefined();
    expect(screen.getByRole(/button/).getAttribute("disabled")).toBeDefined();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="_default_e76392"
          disabled=""
        />
      </div>
    `);
  });

  const variants: AerButtonVariants[] = [
    "primary",
    "tertiary",
    "important",
    "default",
  ];
  for (const variant of variants) {
    it(`should pass button correct variant classname for ${variant}`, async () => {
      const { container } = render(<AerButton variant={variant} />);
      const regexp = new RegExp(variant ? variant : "default");

      expect(regexp.test(screen.getByRole(/button/).className)).toBeTruthy();
    });
  }
});
