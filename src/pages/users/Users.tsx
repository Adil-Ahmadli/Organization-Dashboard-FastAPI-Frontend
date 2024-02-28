import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
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
    field: "role",
    headerName: "Employee role",
    width: 150,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    editable: true,
    type: "boolean",
  }
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    email: "admin@solarvis1111.com",
    role: "admin",
    status: "true",
  },
  {
    id: 2,
    lastName: "Snow",
    firstName: "Jon",
    email: "admin",
    role: "admin",
  },
  {
    id: 3,
    lastName: "Snow",
    firstName: "Jon",
    email: "superadmin",
    role: "admin",
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add new user</button>
      </div>
      <DataTable slug="members" columns={columns} rows={rows} />
      {open && <Add slug="member" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
