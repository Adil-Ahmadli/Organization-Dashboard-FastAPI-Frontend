import { useContext, useState } from "react";
import "./add.scss";
import { GridColDef } from "@mui/x-data-grid";
import { UserContext } from "../../context/UserContext";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getUsers: () => Promise<void>;
};

const UserAdd = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        email: email,
        name: firstName,
        surname: lastName,
        employee_role: role,
        password: password,
      }),
    };

    const response = await fetch(
      "http://localhost:8000/api/members",
      requestOptions
    );

    if (!response.ok) {
      //setErrorMessage("Something went wrong when creating lead");
      console.log(response);
    } else {
      cleanFormData();
      //handleModal();
    }
  };

  const cleanFormData = () => {
    setFirstName("");
    setLastName("");
    setRole("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="add">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            props.setOpen(false);
            props.getUsers();
          }}
        >
          X
        </span>
        <h1>Add new user</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label> First name </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label> Surname </label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label> Email </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label> Employee role </label>
            <input
              type="text"
              placeholder="Enter role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label> Password </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
