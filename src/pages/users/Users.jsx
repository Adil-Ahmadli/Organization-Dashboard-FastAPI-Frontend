import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useContext, useEffect, useState } from "react";
import UserAdd from "../../components/add/UserAdd";
import { UserContext } from "../../context/UserContext";
import ErrorMessage from "../login/ErrorMessage";
import { DataArray } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const columns = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "surname",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    editable: false,
  },
  {
    field: "employee_role",
    headerName: "Employee role",
    width: 150,
    editable: false,
  },
  {
    field: "active",
    headerName: "Status",
    width: 100,
    editable: true,
    type: "boolean",
  },
];

const Users = () => {
  const [token, setToken] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuperAdmin, setisSuperAdmin] = useState(false);

  try {
    const decoded = jwtDecode(token);
    if (decoded.employee_role === "superadmin" && isSuperAdmin === false) {
      setisSuperAdmin(true);
    }
    if (decoded.employee_role !== "superadmin" && isSuperAdmin === true) {
      setisSuperAdmin(false);
    }
  } catch (error) {
    console.log("Error decoding token", error);
  }
  const getUsers = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/members",
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setUsers(data);
      console.log(data);
      setLoaded(true);
    }
  };

  const deleteUser = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(
      "http://localhost:8000/api/members/" + id,
      requestOptions
    );

    if (!response.ok) {
      const data = await response.json();
      setErrorMessage(data.detail);
    } else {
      await getUsers();
      setLoaded(true);
    }
  };

  const updateUser = async (row) => {
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
      "http://localhost:8000/api/members/" + row.id,
      requestOptions
    );

    if (!response.ok) {
      const data = await response.json();
      setErrorMessage(data.detail);
    } else {
      await getUsers();
      setLoaded(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        {isSuperAdmin && (
          <button onClick={() => setOpen(true)}>Add new user</button>
        )}
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <DataTable
        slug="members"
        columns={columns}
        rows={users}
        delete={deleteUser}
        update={updateUser}
      />
      {open && <UserAdd setOpen={setOpen} getUsers={getUsers} />}
    </div>
  );
};

export default Users;
