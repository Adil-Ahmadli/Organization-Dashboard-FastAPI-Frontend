import { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import "./logs.scss";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "subject_id",
    headerName: "Subject ID",
    width: 150,
    editable: false,
    type: "string",
  },
  {
    field: "subject_email",
    headerName: "Subject Email",
    width: 300,
    editable: false,
    type: "string",
    sortable: true,
  },
  {
    field: "object_id",
    headerName: "Object ID",
    width: 150,
    editable: false,
    type: "number",
    sortable: true,
  },
  {
    field: "log",
    headerName: "Log",
    width: 150,
    editable: false,
    type: "string",
    sortable: true,
  },
  {
    field: "date",
    headerName: "Created At",
    width: 150,
    editable: false,
    type: "string",
    sortable: true,
  },
];

const rows: object[] = [];

const Logs = () => {
  return (
    <div className="logs">
      <div className="info">
        <h1>Logs</h1>
      </div>
      <DataTable slug="logs" columns={columns} rows={rows} />
    </div>
  );
};

export default Logs;
