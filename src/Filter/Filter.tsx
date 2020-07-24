import React from "react";
import { Form, FormContents, FormInput, FormSelect } from "../Form";

import styles from "./Filters.module.scss";
// import Button from "../Button";

interface Props {
  onSubmitFn: (d: any) => void;
  regions: string[];
  statuses: string[];
}

export const Filter: React.FC<Props> = ({
  onSubmitFn,
  regions = [],
  statuses = [],
}) => (
  <div className={styles.component}>
    <h2 className={styles.title}>Filter</h2>
    <Form onSubmitFn={onSubmitFn} validationSchema={{}}>
      <FormContents className={styles.filterOptions}>
        <FormSelect
          name="region"
          label="Region"
          options={regions.map((region) => ({
            label: region,
            value: region,
          }))}
        />

        <FormSelect
          name="status"
          label="Status"
          options={statuses.map((status) => ({
            label: status,
            value: status,
          }))}
        />

        <FormInput name="uuid" label="UUID" placeholder="UUID here..." />

        <div className={styles.applyContainer}>
          <button type="submit">Apply</button>
          {/* TODO Get Reset Icon */}
          <button type="reset" className={styles.reset}>
            Reset
          </button>
        </div>
      </FormContents>
    </Form>
  </div>
);

export default Filter;
