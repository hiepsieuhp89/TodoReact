/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { TodoEditForm } from "./TodoEditForm";
import { Specifications } from "../product-specifications/Specifications";
import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
import { Remarks } from "../product-remarks/Remarks";

const initTodo = {
  id: undefined,
  model: "",
  manufacture: "Pontiac",
  modelYear: 2020,
  mileage: 0,
  description: "",
  color: "Red",
  price: 10000,
  condition: 1,
  status: 0,
  VINCode: "",
};

export function TodoEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, productForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForEdit: state.products.productForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchTodo(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Todo";
    if (productForEdit && id) {
      _title = `Edit product '${productForEdit.manufacture} ${productForEdit.model} - ${productForEdit.modelYear}'`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, id]);

  const saveTodo = (values) => {
    console.log(values);
    if (!id) {
      dispatch(actions.createTodo(values)).then(() => backToTodosList());
    } else {
      dispatch(actions.updateTodo(values)).then(() => backToTodosList());
    }
  };

  const btnRef = useRef();  
  const saveTodoClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToTodosList = () => {
    history.push(`/e-commerce/products`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToTodosList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveTodoClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              Basic info
            </a>
          </li>
          {id && (
            <>
              {" "}
              <li className="nav-item" onClick={() => setTab("remarks")}>
                <a
                  className={`nav-link ${tab === "remarks" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  aria-selected={(tab === "remarks").toString()}
                >
                  Todo remarks
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("specs")}>
                <a
                  className={`nav-link ${tab === "specs" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "specs").toString()}
                >
                  Todo specifications
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <TodoEditForm
              actionsLoading={actionsLoading}
              product={productForEdit || initTodo}
              btnRef={btnRef}
              saveTodo={saveTodo}
            />
          )}
          {tab === "remarks" && id && (
            <RemarksUIProvider currentTodoId={id}>
              <Remarks />
            </RemarksUIProvider>
          )}
          {tab === "specs" && id && (
            <SpecificationsUIProvider currentTodoId={id}>
              <Specifications />
            </SpecificationsUIProvider>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
