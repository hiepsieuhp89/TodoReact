import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { TodosPage } from "./TodoPages/TodosPage";
import { TodoEdit } from "./TodoPages/todo-edit/TodoEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";

export const TodoPage = ()=>{
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/todos/new" component={TodoEdit} />
        <ContentRoute path="/todos/:id/edit" component={TodoEdit} />
        <ContentRoute path="/auths" component={TodosPage} />
      </Switch>
    </Suspense>
  );
}
