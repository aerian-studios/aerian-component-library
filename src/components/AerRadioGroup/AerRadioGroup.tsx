import React, {
	forwardRef,
	ReactElement,
	ReactNode,
	useMemo,
	useRef,
	useState,
} from "react";
import cx from "classnames";
import styles from "./AerRadioGroup.module.scss";
import { DefaultProps, HideableTextShape } from "../../types/types";
import { DotFilledIcon } from "@radix-ui/react-icons";
import {
	elementIsHideableTextShape,
	isObject,
	isReactElement,
} from "../../utils/dataStructures";
import { hyphenJoin } from "../../utils/stringUtils";

export const isLabelProps = (
	props: string | ReactElement | LabelProps,
): props is LabelProps => typeof props === "object" && "hidden" in props;

export type LabelProps = { name: string | ReactElement; hidden: boolean };

/**
 *
 */
export type Selectable = {
	/** Value is what is returned from form submissions when the item is checked, so should ideally be set. */
	value: string;
	/** The checked state of the selectable. */
	checked?: boolean;
	/** If providing a checked state, we need a way of changing it. */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type AerRadioButtonProps = DefaultProps<"input"> &
	Selectable & {
		/** Required label for the radio. NOTE: you can hide the label using the `LabelProps` API, but must provide a label to make the field accessible. */
		label: string | ReactElement | LabelProps;
		/** The element to use as the radio background. NOTE: to hide the box altogether, please provide an empty element. */
		radioBackground?: ReactElement | null;
		/** The element to use for the checked state. */
		checkedIcon?: ReactElement | null;
		/** The AerRadioGroup.Item will not accept children. Please add all content in the `label` prop. */
		children?: never;
		/** NOTE: The onChange event is provided by the AerRadioGroup, anything that you provide will be called after the `onChange` handler passed to that. */
		onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	};
/**
 * AerRadioGroup.Item is a typical radio input.
 */
export const AerRadioButton = forwardRef(
	(
		{
			className,
			value,
			label,
			radioBackground,
			checked,
			checkedIcon = <DotFilledIcon className={styles.checkedIcon} />,
			onChange,
			...rest
		}: AerRadioButtonProps,
		ref: React.ForwardedRef<HTMLInputElement>,
	) => {
		const dataDisabled: Record<string, true | never> = {};
		if ("disabled" in rest) {
			dataDisabled["data-disabled"] = true;
		}
		return (
			<label className={cx(styles.radioInput, className)} {...dataDisabled}>
				<span className={cx(styles.indicator)}>
					<input
						role="radio"
						type="radio"
						{...rest}
						checked={checked}
						ref={ref}
						className={cx(styles.input, className)}
						onChange={onChange}
					/>
					<span
						aria-hidden
						className={cx(styles.imgWrapper, {
							[styles.radioBackground]:
								!radioBackground && radioBackground !== null,
						})}
					>
						{radioBackground}
						{checked && checkedIcon}
					</span>
				</span>
				<span
					className={cx(styles.label, {
						[styles.visuallyHidden]: isLabelProps(label) && label.hidden,
					})}
				>
					{isLabelProps(label) ? label.name : label}
				</span>
			</label>
		);
	},
);

const implementsTheSelectableInterface = (obj: unknown): obj is Selectable =>
	isObject(obj) &&
	"value" in obj &&
	("label" in obj || "checked" in obj || "defaultChecked" in obj);

export type AerRadioGroupProps = DefaultProps<"fieldset"> & {
	value: string;
	groupLabel: string | HideableTextShape<string>;
	onChange?: (value: string) => void;
};

/**
 * AerRadioGroup allows automatic control of accessible radio buttons
 */
export const AerRadioGroup = forwardRef(
	(
		{
			className,
			children,
			onChange,
			groupLabel,
			value,
			...rest
		}: AerRadioGroupProps,
		ref: React.ForwardedRef<HTMLFieldSetElement>,
	) => {
		const [selected, setSelected] = useState<string>(value);
		const uuid = useRef<string>(`aer-radio-${Date.now()}`);
		const defaultName =
			(groupLabel &&
				hyphenJoin(
					elementIsHideableTextShape(groupLabel) ? groupLabel.text : groupLabel,
				)) ||
			uuid.current;

		const getHandleChange =
			(
				value: string,
				cb?: ((ev: React.ChangeEvent<HTMLInputElement>) => unknown) | null,
			) =>
			(ev: React.ChangeEvent<HTMLInputElement>) => {
				setSelected(() => value);

				onChange?.(value);
				cb?.(ev);
			};

		const trainedChildren = useMemo(() => {
			const findRadioButtonsAndApplyProps = (node: ReactNode): ReactNode => {
				return React.Children.map(node, (child): ReactNode => {
					if (!isReactElement(child) || typeof child.props !== "object") {
						return child;
					}

					if (implementsTheSelectableInterface(child.props)) {
						const typedChild: ReactElement<AerRadioButtonProps> = child;

						const onChange = getHandleChange(
							typedChild.props.value,
							typedChild.props.onChange,
						);

						const checked = selected === typedChild.props.value;

						const clone = React.cloneElement(typedChild, {
							...typedChild.props,
							onChange: onChange,
							checked: checked,
							name: defaultName,
						});

						return clone;
					}

					// check the children as well
					return React.cloneElement(child, {
						...child.props,
						children: findRadioButtonsAndApplyProps(child.props.children),
					});
				});
			};

			return findRadioButtonsAndApplyProps(children);
		}, [selected]);

		return (
			<fieldset
				className={cx(styles.component, className)}
				{...rest}
				role="radiogroup"
				ref={ref}
			>
				{elementIsHideableTextShape(groupLabel) ? (
					<legend
						className={cx({
							[styles.visuallyHidden]: groupLabel.hide,
							[styles.title]: groupLabel.hide,
						})}
					>
						{groupLabel.text}
					</legend>
				) : (
					<legend className={cx(styles.title)}>{groupLabel}</legend>
				)}
				{trainedChildren}
			</fieldset>
		);
	},
);
