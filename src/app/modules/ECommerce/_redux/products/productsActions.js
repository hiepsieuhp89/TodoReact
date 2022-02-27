import * as requestFromServer from "./productsCrud";
import {productsSlice, callTypes} from "./productsSlice";

const {actions} = productsSlice;

export const fetchTodos = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTodos(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.productsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find products";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTodo = id => dispatch => {
  if (!id) {
    return dispatch(actions.productFetched({ productForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTodoById(id)
    .then(response => {
      const product = response.data;
      dispatch(actions.productFetched({ productForEdit: product }));
    })
    .catch(error => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTodo = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTodo(id)
    .then(response => {
      dispatch(actions.productDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createTodo = productForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTodo(productForCreation)
    .then(response => {
      const { product } = response.data;
      dispatch(actions.productCreated({ product }));
    })
    .catch(error => {
      error.clientMessage = "Can't create product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTodo = product => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTodo(product)
    .then(() => {
      dispatch(actions.productUpdated({ product }));
    })
    .catch(error => {
      error.clientMessage = "Can't update product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTodosStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTodos(ids, status)
    .then(() => {
      dispatch(actions.productsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update products status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTodos = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTodos(ids)
    .then(() => {
      dispatch(actions.productsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete products";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
