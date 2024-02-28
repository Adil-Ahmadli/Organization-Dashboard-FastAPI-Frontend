import "./add.scss";
import { GridColDef } from "@mui/x-data-grid";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("submit");
};

const Add = (props: Props) => {
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "status")
            .map((column) => (
              <div className="item">
                <label> {column.headerName} </label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          {props.slug === "user" && (
            <div className="item">
              <label> Password </label>
              <input type="password" />
            </div>
          )}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
