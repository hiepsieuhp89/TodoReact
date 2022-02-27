import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { TodosFilter } from "./products-filter/TodosFilter";
import { TodosTable } from "./products-table/TodosTable";
import { TodosGrouping } from "./products-grouping/TodosGrouping";
import { useTodosUIContext } from "./TodosUIContext";

export function TodosCard() {
  const productsUIContext = useTodosUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      newTodoButtonClick: productsUIContext.newTodoButtonClick,
      openDeleteTodosDialog: productsUIContext.openDeleteTodosDialog,
      openEditTodoPage: productsUIContext.openEditTodoPage,
      openUpdateTodosStatusDialog:
        productsUIContext.openUpdateTodosStatusDialog,
      openFetchTodosDialog: productsUIContext.openFetchTodosDialog,
    };
  }, [productsUIContext]);

  return (
    <Card>
      <CardHeader title="Todos list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productsUIProps.newTodoButtonClick}
          >
            New Todo
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TodosFilter />
        {productsUIProps.ids.length > 0 && (
          <>
            <TodosGrouping />
          </>
        )}
        <TodosTable />
      </CardBody>
    </Card>
  );
}
