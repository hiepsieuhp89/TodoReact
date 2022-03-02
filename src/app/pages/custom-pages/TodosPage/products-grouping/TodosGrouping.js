import React, {useState} from "react";
//import { useTodosUIContext } from "../TodosUIContext";
import { TodosDeleteDialog } from "../products-delete-dialog/TodosDeleteDialog";

export function TodosGrouping(props) {

  const [isShowDelete, setIsShowDelete] = useState(false);
  //Todos UI Context
  // const productsUIContext = useTodosUIContext();
  // const productsUIProps = useMemo(() => {
  //   return {
  //     ids: productsUIContext.ids,
  //     setIds: productsUIContext.setIds,
  //     openDeleteTodosDialog: productsUIContext.openDeleteTodosDialog,
  //     openFetchTodosDialog: productsUIContext.openFetchTodosDialog,
  //     openUpdateTodosStatusDialog:
  //       productsUIContext.openUpdateTodosStatusDialog,
  //   };
  // }, [productsUIContext]);

  function openDeleteTodosDialog(){
    setIsShowDelete(true)
  }
  function closeDeleteTodosDialog(){
    setIsShowDelete(false)
  }

  return (
    <>
      <TodosDeleteDialog 
        show={isShowDelete}
        onHide={() => {
          closeDeleteTodosDialog();
        }}
        ids={props.ids} 
      />
      <div className="form">
        <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
          <div className="col-xl-12">
            <div className="form-group form-group-inline">
              <div className="form-label form-label-no-wrap">
                <label className="-font-bold font-danger-">
                  <span>
                    Selected records count: <b>{props.ids.length}</b>
                  </span>
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger font-weight-bolder font-size-sm"
                  onClick={openDeleteTodosDialog}
                >
                  <i className="fa fa-trash"></i> Delete All
                </button>
                &nbsp;
                {/* <button
                  type="button"
                  className="btn btn-light-primary font-weight-bolder font-size-sm"
                  onClick={productsUIProps.openFetchTodosDialog}
                >
                  <i className="fa fa-stream"></i> Fetch Selected
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-light-primary font-weight-bolder font-size-sm"
                  onClick={productsUIProps.openUpdateTodosStatusDialog}
                >
                  <i className="fa fa-sync-alt"></i> Update Status
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
