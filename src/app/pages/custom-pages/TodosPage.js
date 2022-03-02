import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { TodoPage } from "./TodosPage/TodosPage";
import { TodoEditForm } from "./TodosPage/todo-edit/TodoEditForm";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";

export const TodosPage = ()=>{
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/todos/new" component={TodoEditForm} />
        <ContentRoute path="/todos/:id/edit" component={TodoEditForm} />
        <ContentRoute path="/todos" component={TodoPage} />
      </Switch>
    </Suspense>
  );
}
