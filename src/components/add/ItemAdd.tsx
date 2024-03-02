import { useContext, useState } from "react";
import "./add.scss";
import { GridColDef } from "@mui/x-data-grid";
import { UserContext } from "../../context/UserContext";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getItems: () => Promise<void>;
};

const UserAdd = (props: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [token, setToken] = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: title,
        description: description,
        price: price,
      }),
    };

    const response = await fetch(
      "http://localhost:8000/api/items",
      requestOptions
    );

    if (!response.ok) {
      //setErrorMessage("Something went wrong when creating lead");
      console.log(response);
    } else {
      cleanFormData();
    }
  };

  const cleanFormData = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
  };

  return (
    <div className="add">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            props.setOpen(false);
            props.getItems();
          }}
        >
          X
        </span>
        <h1>Add new user</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label> Title </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label> Description </label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label> Price </label>
            <input
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserAdd;
