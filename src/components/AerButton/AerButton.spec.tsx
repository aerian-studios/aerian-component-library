import React from "react";
import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";

import { AerButton } from "./index";

describe("AerButton", () => {
  it("should render correctly", () => {
    const { container } = render(<AerButton disabled={false} />);

    expect(screen.getByRole(/button/)).toBeInTheDocument();
    expect(screen.getByRole(/button/)).not.toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it("should be disabled when passed the disabled prop", () => {
    const { container } = render(<AerButton disabled={true} />);

    expect(screen.getByRole(/button/)).toBeInTheDocument();
    expect(screen.getByRole(/button/)).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it("should pass button correct variant classnames", () => {
    const variants = ["dark", "tertiary", "important"] as const;

    variants.forEach((variant: typeof variants[number]) => {
      const { container } = render(<AerButton variant={variant} />);
      expect(screen.getByRole(/button/)).toHaveClass(variant);
      container.remove();
    });
  });
});
