import React from "react";
import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { AerCheckbox } from "./index";

describe("AerCheckbox", () => {
    afterEach(() => {
        cleanup();
    })
    
    it("should render correctly", () => {
        const { container } = render(<AerCheckbox />);
        expect(container).toMatchSnapshot();
    });
});
