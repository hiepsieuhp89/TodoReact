import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
import { ProductsUpdateStatusDialog } from "./products-update-status-dialog/ProductsUpdateStatusDialog";
import { ProductsCard } from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";

export function ProductsPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/auths/new");
    },
    openEditProductPage: (id) => {
      history.push(`/auths/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/auths/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/auths/deleteCourses`);
    },
    openFetchProductsDialog: () => {
      history.push(`/auths/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/auths/updateStatus");
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <ProductsLoadingDialog />
      <Route path="/auths/deleteCourses">
        {({ history, match }) => (
          <ProductsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <Route path="/auths/:id/delete">
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <Route path="/auths/fetch">
        {({ history, match }) => (
          <ProductsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <Route path="/auths/updateStatus">
        {({ history, match }) => (
          <ProductsUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/auths");
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  );
}