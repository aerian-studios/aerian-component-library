import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AerAccordion } from "./index";

describe("AerAccordion", () => {
    it("should render correctly", () => {
        const { container } = render(<AerAccordion />);
        expect(container).toMatchSnapshot();
    });
});
