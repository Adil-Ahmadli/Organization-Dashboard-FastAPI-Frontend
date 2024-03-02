import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { UserContext } from "./context/UserContext";
import Items from "./pages/items/Items";
import Users from "./pages/users/Users";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Logs from "./pages/logs/Logs";
import "./styles/global.scss";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const [token] = useContext(UserContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Layout /> : <Login />,
      children: [
        { path: "/", element: token ? <Home /> : <Login /> },
        { path: "/items", element: token ? <Items /> : <Login /> },
        { path: "/users", element: token ? <Users /> : <Login /> },
        { path: "/logs", element: token ? <Logs /> : <Login /> },
      ],
    },
    {
      path: "/login",
      element: !token ? <Login /> : <Layout />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
