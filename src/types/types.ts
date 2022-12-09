import { ElementType, ReactElement } from "react";

/**
 * Default component props, it expects to be passed a type of HTMLElement
 */
 export type DefaultProps<T extends ElementType = ElementType> =
 React.ComponentPropsWithoutRef<T> & {
     className?: string;
     children?: React.ReactNode;
 };

 export type HideableTextShape<ElementType = ReactElement<unknown> | string> = {
    text: ElementType;
    hide: boolean;
  };