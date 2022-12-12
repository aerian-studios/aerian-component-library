import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AerRadioGroup } from "./index";

describe("AerRadioGroup", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly", async () => {
    const { container } = render(
      <AerRadioGroup.Root value="docs" groupLabel={"Subject under test"}>
        <AerRadioGroup.Item label="Testing" value="testing" checked />
        <AerRadioGroup.Item label="Writing docs" value="docs" />
        <AerRadioGroup.Item label="Code reviews" value="pr" />
        <AerRadioGroup.Item
          label="Writing new features"
          disabled={true}
          value="new"
        />
      </AerRadioGroup.Root>
    );

    // using implicit assertion of existence inherent in selection
    screen.getByRole("group", { name: "Subject under test" });

    screen.getByRole("radio", { name: "Testing" });
    screen.getByRole("radio", { name: "Writing docs" });
    screen.getByRole("radio", { name: "Code reviews" });
    screen.getByRole("radio", { name: "Writing new features" });

    expect(container).toMatchSnapshot();
  });

  it("should control the selected radio based on the Root `value` prop", async () => {
    render(
      <AerRadioGroup.Root value="docs" groupLabel={"Subject under test"}>
        <AerRadioGroup.Item label="Testing" value="testing" checked />
        <AerRadioGroup.Item label="Writing docs" value="docs" />
        <AerRadioGroup.Item label="Code reviews" value="pr" />
        <AerRadioGroup.Item
          label="Writing new features"
          disabled={true}
          value="new"
        />
      </AerRadioGroup.Root>
    );

    expect(
      (screen.getByRole("radio", { name: "Testing" }) as HTMLInputElement)
        .checked
    ).toBeFalsy();
    expect(
      (screen.getByRole("radio", { name: "Code reviews" }) as HTMLInputElement)
        .checked
    ).toBeFalsy();
    expect(
      (screen.getByRole("radio", { name: "Writing docs" }) as HTMLInputElement)
        .checked
    ).toBeTruthy();

    await userEvent.click(screen.getByRole("radio", { name: "Testing" }));

    expect(
      (screen.getByRole("radio", { name: "Testing" }) as HTMLInputElement)
        .checked
    ).toBeTruthy();
  });

  it.only("should call the `onChange` functions provided with the correct values", async () => {
    const mockGroupChange = vi.fn();
    const mockRadioChange = vi.fn();
    render(
      <AerRadioGroup.Root
        value="new"
        groupLabel={"Subject under test"}
        onChange={mockGroupChange}
      >
        <AerRadioGroup.Item
          label="Testing"
          value="testing"
          onChange={mockRadioChange}
        />
        <AerRadioGroup.Item label="Writing docs" value="docs" />
        <AerRadioGroup.Item
          label="Writing new features"
          disabled={true}
          value="new"
          onChange={mockRadioChange}
        />
      </AerRadioGroup.Root>
    );

    expect(mockGroupChange).not.toHaveBeenCalled();
    expect(mockRadioChange).not.toHaveBeenCalled();

    const testingRadio: HTMLInputElement = screen.getByRole("radio", {
      name: "Testing",
    });
    await userEvent.click(testingRadio);

    expect(mockGroupChange).toHaveBeenCalledTimes(1);
    expect(mockGroupChange).toHaveBeenCalledWith("testing");
    expect(mockRadioChange).toHaveBeenCalledTimes(1);
    expect(mockRadioChange).toHaveBeenCalledWith(
      expect.objectContaining({ type: "change", target: testingRadio })
    );
    expect(testingRadio.checked).toBeTruthy();

    // this is disabled
    await userEvent.click(
      screen.getByRole("radio", { name: "Writing new features" })
    );

    expect(mockGroupChange).not.toHaveBeenCalledWith("new");
    expect(mockGroupChange).toHaveBeenCalledTimes(1);
    expect(mockRadioChange).toHaveBeenCalledTimes(1);

    expect(
      (
        screen.getByRole("radio", {
          name: "Writing new features",
        }) as HTMLInputElement
      ).checked
    ).toBeFalsy();

    // not disabled
    const docsRadio: HTMLInputElement = screen.getByRole("radio", {
      name: "Writing docs",
    });
    await userEvent.click(docsRadio);

    expect(mockGroupChange).toHaveBeenCalledTimes(2);
    expect(mockGroupChange).toHaveBeenCalledWith("docs");
    expect(mockRadioChange).toHaveBeenCalledTimes(1);
    expect(mockRadioChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: docsRadio,
      })
    );
    expect(docsRadio.checked).toBeTruthy();
  });
});
