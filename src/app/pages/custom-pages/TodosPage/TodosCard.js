import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { TodosFilter } from "./products-filter/TodosFilter";
import { TodosTable } from "./todos-table/TodosTable";
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

  function findTodo(){
    fetch(`${process.env.REACT_APP_WEBSERVER_API_URL}/auths`,{
      
    })
    .then(res => res.json()).then((result) => {
    });
  }
  return (
    <Card>
      <CardHeader title="Danh sách tài khoản">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productsUIProps.newTodoButtonClick}
          >
            Thêm tài khoản
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TodosFilter update={findTodo} />
        {productsUIProps.ids.length > 0 && (
          <>
            <TodosGrouping />
          </>
        )}
        <TodosTable queryParams={productsUIProps.queryParams}/>
      </CardBody>
    </Card>
  );
}
