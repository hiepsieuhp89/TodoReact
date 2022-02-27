import React from "react";
import { Route } from "react-router-dom";
import { TodosLoadingDialog } from "./products-loading-dialog/TodosLoadingDialog";
import { TodoDeleteDialog } from "./product-delete-dialog/TodoDeleteDialog";
import { TodosDeleteDialog } from "./products-delete-dialog/TodosDeleteDialog";
import { TodosFetchDialog } from "./products-fetch-dialog/TodosFetchDialog";
import { TodosUpdateStatusDialog } from "./products-update-status-dialog/TodosUpdateStatusDialog";
import { TodosCard } from "./TodosCard";
import { TodosUIProvider } from "./TodosUIContext";

export function TodosPage({ history }) {
  const productsUIEvents = {
    newTodoButtonClick: () => {
      history.push("/e-commerce/products/new");
    },
    openEditTodoPage: (id) => {
      history.push(`/e-commerce/products/${id}/edit`);
    },
    openDeleteTodoDialog: (id) => {
      history.push(`/e-commerce/products/${id}/delete`);
    },
    openDeleteTodosDialog: () => {
      history.push(`/e-commerce/products/deleteTodos`);
    },
    openFetchTodosDialog: () => {
      history.push(`/e-commerce/products/fetch`);
    },
    openUpdateTodosStatusDialog: () => {
      history.push("/e-commerce/products/updateStatus");
    },
  };

  return (
    <TodosUIProvider productsUIEvents={productsUIEvents}>
      <TodosLoadingDialog />
      <Route path="/e-commerce/products/deleteTodos">
        {({ history, match }) => (
          <TodosDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/products/:id/delete">
        {({ history, match }) => (
          <TodoDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/products/fetch">
        {({ history, match }) => (
          <TodosFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/products/updateStatus">
        {({ history, match }) => (
          <TodosUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <TodosCard />
    </TodosUIProvider>
  );
}
