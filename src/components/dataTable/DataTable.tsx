import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  delete: (id: any) => Promise<void>;
  update: (row: any) => Promise<void>;
};

const DataTable = (props: Props) => {
  const [isSuperAdmin, setisSuperAdmin] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  const [token, setToken] = useContext(UserContext);

  try {
    const decoded = jwtDecode(token);
    if (decoded.employee_role === "superadmin" && isSuperAdmin === false) {
      setisSuperAdmin(true);
    }
    if (decoded.employee_role !== "superadmin" && isSuperAdmin === true) {
      setisSuperAdmin(false);
      setisAdmin(true);
    }

    if (decoded.employee_role === "admin" && isAdmin === false) {
      setisSuperAdmin(true);
    }
    if (decoded.employee_role !== "admin" && isAdmin === true) {
      setisSuperAdmin(false);
      setisSuperAdmin(true);
    }
  } catch (error) {
    console.log("Error decoding token", error);
  }

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="action">
          {(isSuperAdmin || isAdmin) && (
            <button
              onClick={() => {
                props.update(params.row);
              }}
            >
              <img src="/view.svg" alt="" />
            </button>
          )}
          {!(isAdmin && props.slug === "items") &&
            props.slug !== "organization" && (
              <button
                className="delete"
                onClick={() => props.delete(params.row.id)}
              >
                <img src="/delete.svg" alt="" />
              </button>
            )}
        </div>
      );
    },
  };
  var columns = props.columns;
  if (props.slug !== "logs") {
    columns = [...props.columns, actionColumn];
  }
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
