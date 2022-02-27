import React from "react";
import {
  TodoConditionCssClasses,
  TodoConditionTitles
} from "../../TodosUIHelpers";

export const ConditionColumnFormatter = (cellContent, row) => (
  <>
    <span
      className={`badge badge-${
        TodoConditionCssClasses[row.condition]
      } badge-dot`}
    ></span>
    &nbsp;
    <span
      className={`font-bold font-${
        TodoConditionCssClasses[row.condition]
      }`}
    >
      {TodoConditionTitles[row.condition]}
    </span>
  </>
);
