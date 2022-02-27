import axios from "axios";

export const PRODUCTS_URL = "api/products";

// CREATE =>  POST: add a new product to the server
export function createTodo(product) {
  return axios.post(PRODUCTS_URL, { product });
}

// READ
export function getAllTodos() {
  return axios.get(PRODUCTS_URL);
}

export function getTodoById(productId) {
  return axios.get(`${PRODUCTS_URL}/${productId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findTodos(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateTodo(product) {
  return axios.put(`${PRODUCTS_URL}/${product.id}`, { product });
}

// UPDATE Status
export function updateStatusForTodos(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForTodos`, {
    ids,
    status
  });
}

// DELETE => delete the product from the server
export function deleteTodo(productId) {
  return axios.delete(`${PRODUCTS_URL}/${productId}`);
}

// DELETE Todos by ids
export function deleteTodos(ids) {
  return axios.post(`${PRODUCTS_URL}/deleteTodos`, { ids });
}
