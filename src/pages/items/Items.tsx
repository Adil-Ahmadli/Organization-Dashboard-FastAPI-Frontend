import { useContext, useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "./items.scss";
import { UserContext } from "../../context/UserContext";
import ErrorMessage from "../login/ErrorMessage";
import ItemAdd from "../../components/add/ItemAdd";
import { jwtDecode } from "jwt-decode";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
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
  const [token] = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setisAdmin] = useState(true);

  try {
    const decoded = jwtDecode(token);
    console.log(decoded);

    if (decoded.employee_role === "admin" && isAdmin === false) {
      setisAdmin(true);
    }
    if (decoded.employee_role !== "admin" && isAdmin === true) {
      setisAdmin(false);
    }
  } catch (error) {
    console.log("Error decoding token", error);
  }

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

  const deleteItem = async (id: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(
      `http://localhost:8000/api/items/${id}`,
      requestOptions
    );
    console.log("-----------------");
    console.log(response);

    console.log("-----------------");

    if (!response.ok) {
      const data = await response.json();
      setErrorMessage(data.detail);
    } else {
      await getItems();
      setLoaded(true);
    }
  };

  const updateItem = async (row: any) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: row.name,
        surname: row.surname,
        active: row.active,
      }),
    };

    const response = await fetch(
      "http://localhost:8000/api/items/" + row.id,
      requestOptions
    );

    if (!response.ok) {
      const data = await response.json();
      setErrorMessage(data.detail);
    } else {
      await getItems();
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
        {!isAdmin && (
          <button onClick={() => setOpen(true)}>Add new item</button>
        )}
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <DataTable
        slug="items"
        columns={columns}
        rows={logs}
        delete={deleteItem}
        update={updateItem}
      />
      {open && <ItemAdd setOpen={setOpen} getItems={getItems} />}
    </div>
  );
};

export default Items;
