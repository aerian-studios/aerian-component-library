import { HideableTextShape } from "../types/types";

export const removeEmptyObjectKVs = (
	originalObject: Record<string | number | symbol, unknown | undefined>,
): Record<string | number | symbol, unknown> => {
	const obj = JSON.parse(JSON.stringify(originalObject));

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const element = obj[key];

			if (typeof element === "undefined") {
				// rome-ignore lint/performance/noDelete: <explanation>
				delete obj[key];
			}
		}
	}

	return obj;
};

export const elementIsHideableTextShape = (
	element: unknown,
): element is HideableTextShape => {
	return isObject(element) && "hide" in element && "text" in element;
};

export function isReactElement(obj: unknown): obj is React.ReactElement {
	return (
		typeof obj === "object" &&
		!!obj &&
		"props" in obj &&
		"type" in obj &&
		!!Object.keys(obj).length
	);
}

export function isObject(obj: unknown): obj is Object {
	return !!obj && typeof obj === "object" && obj.constructor === Object;
}
