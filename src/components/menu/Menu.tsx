import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Menu = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(UserContext);
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);

    if (decoded.employee_role === "user" && menu[1].listItems.length >= 3) {
      menu[1].listItems = menu[1].listItems.filter(
        (listItem) => listItem.title === "Items"
      );
    } else if (
      decoded.employee_role === "admin" &&
      menu[1].listItems.length === 1
    ) {
      menu[1].listItems.push({
        id: 2,
        title: "Logs",
        url: "/logs",
        icon: "log.svg",
      });
      menu[1].listItems.push({
        id: 3,
        title: "Users",
        url: "/users",
        icon: "user.svg",
      });
    } else if (
      decoded.employee_role === "admin" &&
      menu[1].listItems.length === 4
    ) {
      menu[1].listItems = menu[1].listItems.filter(
        (listItem) => listItem.title === "Items"
      );
      menu[1].listItems.push({
        id: 2,
        title: "Logs",
        url: "/logs",
        icon: "log.svg",
      });
      menu[1].listItems.push({
        id: 3,
        title: "Users",
        url: "/users",
        icon: "user.svg",
      });
    } else if (
      decoded.employee_role === "superadmin" &&
      menu[1].listItems.length === 1
    ) {
      menu[1].listItems.push({
        id: 2,
        title: "Logs",
        url: "/logs",
        icon: "log.svg",
      });
      menu[1].listItems.push({
        id: 3,
        title: "Users",
        url: "/users",
        icon: "user.svg",
      });
      menu[1].listItems.push({
        id: 4,
        title: "Organization",
        url: "/organization",
        icon: "order.svg",
      });
    } else if (
      decoded.employee_role === "superadmin" &&
      menu[1].listItems.length === 3
    ) {
      menu[1].listItems.push({
        id: 4,
        title: "Organization",
        url: "/organization",
        icon: "order.svg",
      });
    }
  } catch (error) {
    console.log("Error decoding token", error);
  }

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems
            .filter((listItem) => listItem.title !== "Log out")
            .map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <img src={listItem.icon} alt="" />
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            ))}
        </div>
      ))}
      <div className="item">
        <span className="title">Log Out</span>
        <div onClick={handleLogout} className="listItem">
          <img src="logout.svg" alt="" />
          <span className="listItemTitle">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
