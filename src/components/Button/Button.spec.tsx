import React from "react";

import { render, screen } from "@testing-library/react";

import { Button } from "./index";

describe("Button", () => {
    it("should render correctly", () => {
        const { container } = render(<Button disabled={false} />);

        expect(screen.getByRole(/button/)).toBeInTheDocument();
        expect(screen.getByRole(/button/)).not.toBeDisabled();
        expect(container).toMatchSnapshot();
    });

    it("should be disabled when passed the disabled prop", () => {
        const { container } = render(<Button disabled={true} />);

        expect(screen.getByRole(/button/)).toBeInTheDocument();
        expect(screen.getByRole(/button/)).toBeDisabled();
        expect(container).toMatchSnapshot();
    });

    it("should pass button correct variant classnames", () => {
        const variants = ["dark", "tertiary", "negative"] as const;

        variants.forEach((variant: typeof variants[number]) => {
            const { container } = render(<Button variant={variant} />);
            expect(screen.getByRole(/button/)).toHaveClass(variant);
            container.remove();
        });
    });
});
