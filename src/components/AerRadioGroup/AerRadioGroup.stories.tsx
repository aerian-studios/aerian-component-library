import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerRadioGroup } from "./index";
import formStyles from "../../styles/formElements.module.scss";

const Meta: ComponentMeta<typeof AerRadioGroup.Root> = {
	title: "Components/AerRadioGroup",
	component: AerRadioGroup.Root,
	subcomponents: { Item: AerRadioGroup.Item },
};

export default Meta;

const Template: ComponentStory<typeof AerRadioGroup.Root> = (args) => (
	<AerRadioGroup.Root {...args} />
);

export const Default = Template.bind({});
Default.args = {
	groupLabel: { text: "Things I have trouble doing", hide: true },
	value: "pr",
	children: (
		<>
			<AerRadioGroup.Item label="Testing" value="testing" checked />
			<AerRadioGroup.Item label="Writing docs" value="docs" />
			<AerRadioGroup.Item label="Code reviews" value="pr" />
			<AerRadioGroup.Item
				label="Writing new features"
				disabled={true}
				value="new"
			/>
			<p className={formStyles.helpText}>Some help text where I want it.</p>
		</>
	),
};

export const LocalTheme = () => (
	<>
		<p>The AerRadioGroup component implements the following local theme</p>
		<pre>
			{`
        * group: gap: var(--s-cmp-radiogroup-gap, var(--s-1));
        * group:title font-size: var(--t-cmp-radiogroup-title, var(--t-heading-s));
        * group:title font-weight: var(--fw-cmp-radiogroup-title, var(--fw-medium));
        * group:title margin: var(--s-cmp-radiogroup-title, 0 0 var(--s-1));
        * group:title color: var(--c-cmp-radiogroup-title, var(--c-gray-600));
        *
        * radio: width: var(--s-cmp-radio-icon, var(--s-icon));
        * radio: height: var(--s-cmp-radio-icon, var(--s-icon));
        * radio: gap: var(--s-cmp-radio, var(--s-1));
        * radio: border: var(--cmp-radio-icon-border, 2px solid currentColor);
        * radio: border-radius: var(--s-cmp-radio-icon-br, 100%);
        * radio:disabled color: var(--c-input-border-disabled);
        *
        * radio:indicator: color: var(--c-cmp-radio-icon, currentColor);
        * radio:indicator: padding: var(--s-cmp-radio-padding, 1px);
        * radio:indicator: width: var(--s-cmp-radio-icon, var(--s-icon));
        * radio:indicator: height: var(--s-cmp-radio-icon, var(--s-icon));
        * radio:indicator: border-radius: var(--s-cmp-radio-icon-br, 100%);
        *
        * label: color: var(--c-cmp-radio-label, var(--c-body));
        * label: font-size: var(--t-cmp-radio, var(--c-body-m));
        * label:disabled color: var(--c-input-border-disabled);
      `}
		</pre>
	</>
);

export const NoIcons = Template.bind({});
NoIcons.args = {
	groupLabel: "Things I have trouble doing",
	value: "docs",
	children: (
		<>
			<p className={formStyles.helpText}>Some help text where I want it.</p>
			<AerRadioGroup.Item
				label="Testing"
				value="testing"
				radioBackground={null}
				checkedIcon={
					<div style={{ width: "100%", textAlign: "center" }}>💝</div>
				}
			/>
			<AerRadioGroup.Item
				label="Writing docs"
				value="docs"
				radioBackground={null}
				checkedIcon={
					<div style={{ width: "100%", textAlign: "center" }}>X</div>
				}
			/>
			<AerRadioGroup.Item
				label="Code reviews"
				value="pr"
				radioBackground={null}
				checkedIcon={
					<div style={{ width: "100%", textAlign: "center" }}>💝</div>
				}
			/>
			<AerRadioGroup.Item
				label="Writing new features"
				disabled={true}
				value="new"
				radioBackground={null}
				checkedIcon={
					<div style={{ width: "100%", textAlign: "center" }}>X</div>
				}
			/>
		</>
	),
};
