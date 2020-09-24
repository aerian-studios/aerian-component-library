import { useContext, createContext } from "react";
import { UseFormMethods } from "react-hook-form";

export const FormContext = createContext<UseFormMethods>(undefined);

export function useFormContext(name = "Component") {
  const context = useContext(FormContext);
  if (Object.keys(context).length === 0 && context.constructor === Object) {
    throw new Error(`${name} must be used inside a <Form /> component`);
  }

  return context;
}
