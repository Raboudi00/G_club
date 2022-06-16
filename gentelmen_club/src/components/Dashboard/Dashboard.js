import React from "react";
import { Routes, Route } from "react-router-dom";
import useAxios from "axios-hooks";
import Sidenav from "./Sidenav/Sidenav";
import Profile from "./Profile/Profile";
import Eventform from "./Eventform/Eventform";
import Home from "./Home/Home";
import Myevents from "./Myevents/Myevents";
import Card from "./Eventcard"
import "./Dashboard.css";

function Dashboard(props) {
  const [result, refrech] = useAxios({
    METHOD: "GET",
    url: "/api/event/myevents",
  });
  const [homeResult] = useAxios({
    METHOD: "GET",
    url: "/api/event/home",
  });

  const uniqueRoutes = (data, customize = false) => {
    return data.data ? data.data.map(event => 
      <Route path={`/myevent/${event._id}`} element={<div className="idCard"> <Card event={event} customize={customize} refrech={refrech} /> </div>} key={event._id} />
  ) : null
  }


  return (
    <div className="dashboard-container">
      <div className="dash-sidenav">
        <Sidenav log={(q) => props.log(q)} refresh={props.refresh} />
      </div>
      <Routes>
        <Route path="/" strict exact element={<Home result={homeResult} />} />
        {uniqueRoutes(homeResult)}
        <Route
          path="/profile"
          strict
          exact
          element={<Profile user={props.user} />}
        />
          <Route path="/myevent" strict exact element={<Myevents result={result}  />} />
          {uniqueRoutes(result, true)}
          
        <Route
          path="/addEvent"
          strict
          exact
          element={<Eventform refrech={refrech} />}
          />
      </Routes>
    </div>
  );
}

export default Dashboard;
