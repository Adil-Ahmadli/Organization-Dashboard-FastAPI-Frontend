import { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import "./item.scss";

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

const rows: object[] = [
  {
    id: 1,
    title: "Snow",
    description: "Jon",
    price: 100,
  },
  {
    id: 2,
    title: "Snow",
    description: "Jon",
    price: 100,
  },
];

const Items = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="items">
      <div className="info">
        <h1>Items</h1>
        <button onClick={() => setOpen(true)}>Add new item</button>
      </div>
      <DataTable slug="items" columns={columns} rows={rows} />
      {open && <Add slug="item" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Items;
