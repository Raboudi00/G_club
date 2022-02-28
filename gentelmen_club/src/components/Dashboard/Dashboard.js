import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidenav from "./Sidenav/Sidenav";
import Profile from "./Profile/Profile";
import Eventform from "./Eventform/Eventform";
import Home from "./Home/Home";
import Myevents from "./Myevents/Myevents";
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <div className="dash-sidenav">
        <Sidenav log={(q) => props.log(q)} refresh={props.refresh} />
      </div>
      <Routes>
        <Route
          path="/profile"
          strict
          exact
          element={<Profile user={props.user} />}
        />
        <Route
          path="/addEvent"
          strict
          exact
          element={<Eventform user={props.user} />}
        />
        <Route path="/" strict exact element={<Home />} />
        <Route path="/myevent" strict exact element={<Myevents />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
