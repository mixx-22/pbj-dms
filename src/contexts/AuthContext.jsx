/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const users = [
    {
      name: "System Administrator",
      username: "admin",
      password: "123",
      userType: "admin",
    },
    {
      id: 1,
      name: "Mike Jimenez",
      username: "mike",
      password: "123",
      userType: "admin",
    },
    {
      id: 2,
      name: "Ajad Singh Parmar",
      username: "ajad",
      password: "123",
      userType: "admin",
    },
    {
      id: 3,
      name: "Aristotle Bataan",
      username: "docyummy",
      password: "123",
      userType: "user",
    },
  ];

  const login = (username, password) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
