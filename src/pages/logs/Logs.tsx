import { useContext, useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/UserAdd";
import { GridColDef } from "@mui/x-data-grid";
import "./logs.scss";
import { UserContext } from "../../context/UserContext";
import ErrorMessage from "../login/ErrorMessage";

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

const Logs = () => {
  const [token, setToken] = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getLogs = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/logs",
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setLogs(data);
      console.log(data);

      setLoaded(true);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div className="logs">
      <div className="info">
        <h1>Logs</h1>
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <DataTable
        slug="logs"
        columns={columns}
        rows={logs}
        delete={async (id) => {}}
        update={async (row) => {}}
      />
    </div>
  );
};

export default Logs;
