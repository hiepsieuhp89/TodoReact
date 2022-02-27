import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TodosUIHelpers";

const TodosUIContext = createContext();

export function useTodosUIContext() {
  return useContext(TodosUIContext);
}

export const TodosUIConsumer = TodosUIContext.Consumer;

export function TodosUIProvider({ productsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newTodoButtonClick: productsUIEvents.newTodoButtonClick,
    openEditTodoPage: productsUIEvents.openEditTodoPage,
    openDeleteTodoDialog: productsUIEvents.openDeleteTodoDialog,
    openDeleteTodosDialog: productsUIEvents.openDeleteTodosDialog,
    openFetchTodosDialog: productsUIEvents.openFetchTodosDialog,
    openUpdateTodosStatusDialog: productsUIEvents.openUpdateTodosStatusDialog,
  };

  return (
    <TodosUIContext.Provider value={value}>
      {children}
    </TodosUIContext.Provider>
  );
}
