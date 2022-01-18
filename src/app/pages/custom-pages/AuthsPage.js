import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ProductsPage } from "./CoursePages/ProductsPage";
import { ProductEdit } from "./CoursePages/product-edit/ProductEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";

export const AuthsPage = ()=>{
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/auths/new" component={ProductEdit} />
        <ContentRoute path="/auths/:id/edit" component={ProductEdit} />
        <ContentRoute path="/auths" component={ProductsPage} />
      </Switch>
    </Suspense>
  );
}
