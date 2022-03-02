// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
//import { useHistory, useLocation } from "react-router-dom";
//import queryString from "querystring";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
//import { useDispatch} from "react-redux";
//import * as actions from "../../../_redux/products/productsActions";
import * as uiHelpers from "../TodosUIHelpers";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useTodosUIContext } from "../TodosUIContext";
import { TodosGrouping } from "../products-grouping/TodosGrouping";
//import { TodosDeleteDialog } from "../products-delete-dialog/TodosDeleteDialog";

export function TodosTable(props) {
  // const history = useHistory();
  // const location = useLocation();

  //
  const [totalCount, setTotalCount] = useState(0);
  const [entities, setEntities] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [batchSelection, setBatchSelection] = useState([]);

  // Todos UI Context
  const productsUIContext = useTodosUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      openEditTodoPage: productsUIContext.openEditTodoPage,
      openDeleteTodoDialog: productsUIContext.openDeleteTodoDialog,
    };
  }, [productsUIContext]);

  const getSelectedRows = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      isSelect
        ? setBatchSelection(() => {
            return [...batchSelection, row.id];
          })
        : setBatchSelection(() => {
            return batchSelection.filter((id) => {
              return id != row.id;
            });
          });
    },
    onSelectAll: (isSelect, rows, e) => {
      //console.log(rows)
      isSelect
        ? setBatchSelection(() => {
            return rows.map((row) => row.id);
          })
        : setBatchSelection(() => {
            return [];
          });
    },
  };
  useEffect(() => {
    console.log("batchSelection changed! :");
    console.log(batchSelection);
  }, [batchSelection]);

  // Getting curret state of products list from store (Redux)
  // const { currentState } = useSelector(
  //   (state) => ({ currentState: state.products }),
  //   shallowEqual
  // );
  //const { totalCount, listLoading } = currentState;

  // Todos Redux state
  //const dispatch = useDispatch();

  function fetchTodos(keyword) {
    const url = keyword
      ? `${process.env.REACT_APP_WEBSERVER_API_URL}/auths?keyword=${keyword}`
      : `${process.env.REACT_APP_WEBSERVER_API_URL}/auths`;

    fetch(url+'?token='+localStorage.getItem('token'))
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        result = result.hits.hits.map((e,i)=>{
          return {
            id: e._id,
            name: e._source.name,
            password: e._source.password,
            username: e._source.username,
            token: e._source.token,
          }
        });
        setTotalCount(result.length);
        setEntities(result);
        setListLoading(false);
      });
  }
  useEffect(() => {
    const keyword = props.queryParams.filter.model || "";
    console.log("keyword searched: " + keyword);

    fetchTodos(keyword);
    console.log("auths fetched");
  }, [props]);

  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "Mã",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "name",
      text: "Tên",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "priority",
      text: "Mức độ ưu tiên",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Trạng thái",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTodoPage: productsUIProps.openEditTodoPage,
        openDeleteTodoDialog: productsUIProps.openDeleteTodoDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: productsUIProps.queryParams.pageSize,
    page: productsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      {batchSelection.length > 0 && <TodosGrouping ids={batchSelection} />}
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        bordered={false}
        keyField="id"
        data={entities === null ? [] : entities}
        columns={columns}
        selectRow={getSelectedRows}
        pagination={paginationFactory()}
      >
        <PleaseWaitMessage entities={entities} />
        <NoRecordsFoundMessage entities={entities} />
      </BootstrapTable>
    </>
  );
}
