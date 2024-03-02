import React, { useEffect, useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("dashboardtoken"));

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:8000/api/members/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("dashboardtoken", token);
    };

    console.log(token);

    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
