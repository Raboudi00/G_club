import React, { useEffect } from "react";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import spinner from "./img/spinner.gif";
import "./App.css";

function App() {
  const [user, setUser] = React.useState({ loadingUser: true, user: null });
  const [redirect, setRedirect] = React.useState(false);

  const baseURL = "http://192.168.1.19:5000";

  const refreshUser = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers["authorization"] = "Bearer " + jwt;
      axios
        .get("/api/user")
        .then((res) => {
          setUser({ loadingUser: false, user: res.data.user });
          const newJWT = res.data.jwt.token;
          localStorage.setItem("jwt", newJWT);
          axios.defaults.headers["authorization"] = "Bearer " + newJWT;
          setRedirect(true);
        })
        .catch(() => {
          axios.defaults.headers["authorization"] = "";
          localStorage.removeItem("jwt");
          setUser({ loadingUser: false, user: null });
        });
    } else {
      setUser({ loadingUser: false, user: null });
    }
  };

  useEffect(() => {
    axios.defaults.baseURL = baseURL;
    refreshUser();
    setInterval(refreshUser, 800 * 1000);
  }, []);

  if (user.loadingUser)
    return <img className="spinner" src={spinner} alt="brkn" />;
  return (
    <Routes>
      {redirect && user.user ? (
        <Route
          path="/dashboard/*"
          exact
          element={
            <Dashboard
              log={(q) => setRedirect(q)}
              refresh={refreshUser}
              user={user.user}
            />
          }
        />
      ) : (
        <>
          <Route
            path="/"
            exact
            element={
              <>
                <Navbar />
                <Home
                  refresh={refreshUser}
                  redirect={(q) => setRedirect(q)}
                  userID={user.user ? user.user.id : ""}
                />
              </>
            }
          />

          <Route
            path="/form"
            exact
            element={
              <>
                <Navbar />
                <Form
                  userID={user.user ? user.user.id : ""}
                  redirect={(q) => setRedirect(q)}
                  setUser={(q) => setUser(q)}
                />
              </>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;
