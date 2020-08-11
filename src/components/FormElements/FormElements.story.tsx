import React from "react";
import { Form } from "../Form";
import { FormInput, FormSelect } from ".";

export default {
  title: "Form Elements",
};

const noop = () => {};

export const formInput = () => (
  <Form onSubmitFn={noop} validationSchema={{}}>
    <FormInput label="Form Input" name="input" placeholder="Input here..." />
  </Form>
);

export const formSelect = () => (
  <Form onSubmitFn={noop} validationSchema={{}}>
    <FormSelect
      label="Inputs"
      name="inputs"
      options={[
        { label: "Input 1", value: "input_1" },
        { label: "Input 2", value: "input_2" },
        { label: "Input 3", value: "input_3" },
      ]}
    />
  </Form>
);
