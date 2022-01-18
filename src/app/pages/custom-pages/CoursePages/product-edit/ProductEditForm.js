// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../_metronic/_partials/controls";
import {Alert} from "react-bootstrap"
// import {
//   AVAILABLE_COLORS,
//   AVAILABLE_MANUFACTURES,
//   ProductStatusTitles,
//   ProductConditionTitles,
// } from "../ProductsUIHelpers";

// Validation schema
const ProductEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
});

export function ProductEditForm({
  validate_errors,
  product,
  btnRef,
  saveProduct,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-2">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Họ tên"
                    label="Họ tên"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="username"
                    component={Input}
                    placeholder="Tên đăng nhập"
                    label="Tên đăng nhập"
                  />
                </div>
                <div className="col-lg-2">
                  <Field
                    name="password"
                    component={Input}
                    placeholder="Mật khẩu"
                    label="Mật khẩu"
                  />
                </div>
                <div className="col-lg-4">
                  <Select name="status" label="Trạng thái">
                    {[{name:"--Select--"},{value:1,name:"Hoạt động"},{value:0,name:"Không hoạt động"}].map((actor, id) => (
                      <option selected={id==0} key={id} value={actor.value}>
                        {actor.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              {validate_errors.map((message, id)=>(
              <Alert key={id} variant={message.variant}>
                <p>{message.message}</p>
              </Alert>))}
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
