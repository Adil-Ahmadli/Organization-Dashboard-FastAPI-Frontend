import { useContext, useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import "./organization.scss";
import { UserContext } from "../../context/UserContext";
import ErrorMessage from "../login/ErrorMessage";
import ItemAdd from "../../components/add/ItemAdd";
import { jwtDecode } from "jwt-decode";

const columns = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
    type: "string",
  },
  {
    field: "active",
    headerName: "Status",
    width: 100,
    editable: true,
    type: "boolean",
  },
];

const Organization = () => {
  const [open, setOpen] = useState(false);
  const [token] = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setisAdmin] = useState(true);

  try {
    const decoded = jwtDecode(token);
    console.log(decoded);

    if (decoded.employee_role === "superadmin" && isAdmin === false) {
      setisAdmin(true);
    }
    if (decoded.employee_role !== "superadmin" && isAdmin === true) {
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
      "http://localhost:8000/api/organization",
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

  const updateItem = async (row) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        active: row.active,
      }),
    };

    const response = await fetch(
      "http://localhost:8000/api/organization/" + row.id,
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
        <h1>Organization</h1>
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <DataTable
        slug="organization"
        columns={columns}
        rows={logs}
        delete={() => {}}
        update={updateItem}
      />
    </div>
  );
};

export default Organization;
