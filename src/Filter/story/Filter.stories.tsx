import React from "react";
import { Filter } from "../Filter";

export default {
  title: "Filter",
};

const regions = [
  { label: "United Kingdom", value: "united_kingdom" },
  { label: "France", value: "france" },
  { label: "United States", value: "united_states" },
  { label: "Middle East", value: "middle_east" },
];

const statues = [
  { label: "Consent Received", value: "content_received" },
  { label: "Consent Revoked", value: "consent_revoked" },
  { label: "Previewed", value: "previewd" },
  { label: "Encoded", value: "encoded" },
];

export const identFilters = () => (
  <Filter
    onSubmitFn={(d) => console.log(d)}
    regions={regions}
    statuses={statues}
  />
);
