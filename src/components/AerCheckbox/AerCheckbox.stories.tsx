import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerCheckbox } from "./index";

const Meta: ComponentMeta<typeof AerCheckbox> = {
	title: "Components/AerCheckbox",
	component: AerCheckbox,
};

export default Meta;

const Template: ComponentStory<typeof AerCheckbox> = (args) => (
	<AerCheckbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
	label: "Accept the terms and conditions",
	value: "t&c",
};

export const LocalTheme: ComponentStory<any> = () => (
	<>
		<p>The AerCheckbox component implements the following local theme</p>
		<p>
			<em>
				NOTE: currently the AerCheckbox has some default behaviour for
				invalidity that might need work in the future
			</em>
		</p>
		<pre>
			{`
      input: gap: var(--s-cmp-checkbox, var(--s-1));
      input:icon: color: var(--c-cmp-checkbox-icon, var(--c-body));
      input:icon: width/height: var(--s-cmp-checkbox-icon, var(--s-icon));
      input:icon: padding: var(--s-cmp-checkbox-padding, 1px);
      input:icon: border-radius: var(--s-cmp-checkbox-icon-br, var(--s-border-radius-xs));
      input:icon:hover: background-color: var(--c-cmp-checkbox-icon-bg-hover, var(--c-gray-200));
      input:icon:border: border: 2px solid var(--c-cmp-checkbox-icon-border, currentColor);
      
      label: color: var(--c-cmp-checkbox-label, var(--c-body));
      label: padding: var(--s-cmp-checkbox-padding, 0 0 0 var(--s-1));
      label: font-size: var(--t-cmp-checkbox, var(--c-body-m));
      `}
		</pre>
	</>
);

export const Checked = Template.bind({});
Checked.args = {
	label: "Accept the terms and conditions",
	value: "t&c",
	defaultState: true,
};
Checked.parameters = {
	docs: {
		description: {
			story: "This is the dark variant of the component and it displays...",
		},
	},
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
	label: "Accept the terms and conditions",
	value: "t&c",
	defaultState: "indeterminate",
};
Indeterminate.parameters = {
	docs: {
		description: {
			story:
				"Indeterminate is only settable (and unsettable) via the `checked` prop; local state changes will not affect it",
		},
	},
};

export const Invalid = Template.bind({});
Invalid.args = {
	label: "Accept the terms and conditions",
	value: "t&c",
	defaultState: true,
	required: true,
};
Invalid.parameters = {
	docs: {
		description: {
			story:
				"Invalid elements will show an error message. To trigger the error on this required field, deselect the checkbox and tab or click outside",
		},
	},
};

export const CustomCheckIcons = Template.bind({});

CustomCheckIcons.args = {
	label: "Accept the terms and conditions",
	value: "t&c",
	defaultState: false,
	checkBox: <span style={{ border: "2px solid green" }}></span>,
	checkedIcon: (
		<span style={{ display: "flex", justifyContent: "center" }}>💝</span>
	),
};
CustomCheckIcons.parameters = {
	docs: {
		description: {
			story:
				"CustomCheckIcons give you complete control over the look of the check box UI. The `checkBox` relates to the background; the `checkedIcon` relates to the icon to show when checked; and the `indeterminateIcon`, what to show when indeterminate",
		},
	},
};

export const CustomInvalidMessage = Template.bind({});
CustomInvalidMessage.args = {
	label: "Accept the terms and conditions",
	value: "t&c",
	defaultState: false,
	required: true,
	errorMessage: "Beep Boop! Please fill in this field.",
};
CustomInvalidMessage.parameters = {
	docs: {
		description: {
			story:
				"It is possible to override the validity by providing a custom `errorMessage` prop. NOTE: The component will remain invalid until the `errorMessage` prop is `falsy`",
		},
	},
};
