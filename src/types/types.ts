import { ElementType } from "react";

/**
 * Default component props, it expects to be passed a type of HTMLElement
 */
 export type DefaultProps<T extends ElementType = ElementType> =
 React.ComponentPropsWithoutRef<T> & {
     className?: string;
     children?: React.ReactNode;
 };