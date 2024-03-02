import { useContext, useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import "./items.scss";
import { UserContext } from "../../context/UserContext";
import ErrorMessage from "../login/ErrorMessage";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: true,
    type: "string",
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    editable: true,
    type: "string",
    sortable: false,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    editable: true,
    type: "number",
  },
];

const Items = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getItems = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/items",
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
    getItems();
  }, []);

  return (
    <div className="items">
      <div className="info">
        <h1>Items</h1>
        <button onClick={() => setOpen(true)}>Add new item</button>
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <DataTable slug="items" columns={columns} rows={logs} />
      {open && <Add slug="item" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Items;
