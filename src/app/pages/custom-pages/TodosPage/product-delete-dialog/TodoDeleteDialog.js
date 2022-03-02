/* eslint-disable no-restricted-imports */
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
//import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
//import * as actions from "../../../_redux/products/productsActions";
//import { useTodosUIContext } from "../TodosUIContext";

export function TodoDeleteDialog({ id, show, onHide }) {
  // Todos UI Context
  //const productsUIContext = useTodosUIContext();
  const history = useHistory();

  // Todos Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.products.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteTodo = () => {
    // server request for deleting product by id
    fetch(`${process.env.REACT_APP_WEBSERVER_API_URL}/todo?id=${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json()).then((result) => {
        if(!result.status){
          //setMessages([{message:"Sửa khóa học không thành công", variant:"danger"}]);
        }
        else{
          history.push('/todos');
        }
      });
    // dispatch(actions.deleteTodo(id)).then(() => {
    //   // refresh list after deletion
    //   dispatch(actions.fetchTodos(productsUIProps.queryParams));
    //   // clear selections list
    //   productsUIProps.setIds([]);
    //   // closing delete modal
    //   onHide();
    // });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Todo Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this todo?</span>
        )}
        {isLoading && <span>Todo is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteTodo}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
