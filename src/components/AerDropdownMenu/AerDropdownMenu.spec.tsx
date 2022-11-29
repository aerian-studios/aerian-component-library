import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AerDropdownMenu } from "./index";

describe("AerDropdownMenu", () => {
    afterEach(() => {
        cleanup();
    })
    
    it("should render correctly", async () => {
        const { container } = render(<AerDropdownMenu />);
        expect(container).toMatchSnapshot();
    });
});
