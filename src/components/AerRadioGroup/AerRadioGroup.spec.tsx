import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AerRadioGroup } from "./index";

describe("AerRadioGroup", () => {
    afterEach(() => {
        cleanup();
    })
    
    it("should render correctly", async () => {
        const { container } = render(<AerRadioGroup />);
        expect(container).toMatchSnapshot();
    });
});
