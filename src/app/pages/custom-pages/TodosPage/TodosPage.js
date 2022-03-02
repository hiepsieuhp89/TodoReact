import React from "react";
import { Route } from "react-router-dom";
import { TodosLoadingDialog } from "./products-loading-dialog/TodosLoadingDialog";
import { TodoDeleteDialog } from "./product-delete-dialog/TodoDeleteDialog";
import { TodosDeleteDialog } from "./products-delete-dialog/TodosDeleteDialog";
import { TodosFetchDialog } from "./products-fetch-dialog/TodosFetchDialog";
import { TodosUpdateStatusDialog } from "./products-update-status-dialog/TodosUpdateStatusDialog";
import { TodosCard } from "./TodosCard";
import { TodosUIProvider } from "./TodosUIContext";

export function TodoPage({ history }) {
  const productsUIEvents = {
    newTodoButtonClick: () => {
      history.push("/todos/new");
    },
    openEditTodoPage: (id) => {
      history.push(`/todos/${id}/edit`);
    },
    openDeleteTodoDialog: (id) => {
      history.push(`/todos/${id}/delete`);
    },
    openDeleteTodosDialog: () => {
      history.push(`/todos/deleteTodos`);
    },
    openFetchTodosDialog: () => {
      history.push(`/todos/fetch`);
    },
    openUpdateTodosStatusDialog: () => {
      history.push("/todos/updateStatus");
    },
  };

  return (
    <TodosUIProvider productsUIEvents={productsUIEvents}>
      <TodosLoadingDialog />
      <Route path="/todos/deleteTodos">
        {({ history, match }) => (
          <TodosDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <Route path="/todos/:id/delete">
        {({ history, match }) => (
          <TodoDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <Route path="/todos/fetch">
        {({ history, match }) => (
          <TodosFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <Route path="/todos/updateStatus">
        {({ history, match }) => (
          <TodosUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <TodosCard />
    </TodosUIProvider>
  );
}