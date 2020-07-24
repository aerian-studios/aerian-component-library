import React from "react";

import Button from "../Button";
import ContentWrapper from "../ContentWrapper";
import { Form, FormContents, FormInput, FormSelect, YupTypes } from "../Form";

import styles from "./Filters.module.scss";

interface Props {
  onSubmitFn: (d: FilterData) => void;
  validationSchema?: Record<string, YupTypes>;
  regions: SelectOption[];
  statuses: SelectOption[];
}

interface FilterData {
  region: SelectOption;
  status: SelectOption;
  uuid: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export const Filter: React.FC<Props> = ({
  onSubmitFn,
  validationSchema = {},
  regions = [],
  statuses = [],
}) => (
  <ContentWrapper>
    <h2 className={styles.title}>Filter</h2>
    <Form onSubmitFn={onSubmitFn} validationSchema={validationSchema}>
      <FormContents className={styles.filterOptions}>
        <FormSelect name="region" label="Region" options={regions} />

        <FormSelect name="status" label="Status" options={statuses} />

        <FormInput name="uuid" label="UUID" placeholder="UUID here..." />

        <div className={styles.applyContainer}>
          <Button type="submit">Apply</Button>
          {/* TODO Get Reset Icon */}
          <button type="reset" className={styles.reset}>
            Reset
          </button>
        </div>
      </FormContents>
    </Form>
  </ContentWrapper>
);

export default Filter;
