import React from "react";
import "./Sidenav.css";
import { Link } from "react-router-dom";

export default function Sidenav(props) {
  const Logout = () => {
    localStorage.removeItem("jwt");
    props.log(false);
    props.refresh();
    window.location.replace("/");
  };

  return (
    <div className="nav-container">
      <img className="title" src={require("../../../img/logo.png")} />
      <hr className="divider" />
      <div className="nav-content">
        <div className="routes">
          <Link to="/dashboard" className="nav-routes">
            <span>
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </span>
          </Link>
          <hr className="divider" />
          <Link to="/dashboard/profile" className="nav-routes">
            <span>
              <i className="fa-solid fa-user"></i>
              <p>Profile</p>
            </span>
          </Link>
          <hr className="divider" />

          <Link to="/dashboard/myevent" className="nav-routes">
            <span>
              <i className="fa-solid fa-gauge-high"></i>
              <p>My Events</p>
            </span>
          </Link>

          <hr className="divider" />
          <Link to="/dashboard/addEvent" className="nav-routes">
            <span>
              <i className="fa-solid fa-plus"></i>
              <p>Create Event</p>
            </span>
          </Link>
        </div>
        <button className="btn-logout" onClick={Logout}>
          <i className="fa-solid fa-power-off"></i>
          <p>Log Out</p>
        </button>
      </div>
    </div>
  );
}
