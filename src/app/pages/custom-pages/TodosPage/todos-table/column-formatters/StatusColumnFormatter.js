import React from "react";
import {
  TodoStatusCssClasses,
  TodoStatusTitles
} from "../../TodosUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      TodoStatusCssClasses[row.status]
    } label-inline`}
  >
    {TodoStatusTitles[row.status]}
  </span>
);
