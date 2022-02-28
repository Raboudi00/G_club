import React from "react";
import useAxios from "axios-hooks";
import Card from "../Eventcard";
import spinner from "../../../img/spinner.gif";
import "./Myevents.css";

export default function Myevents() {
  const [{ data, loading, error }, refrech] = useAxios({
    METHOD: "GET",
    url: "/api/event",
  });

  if (loading) return <img className="spinner" src={spinner} alt="brkn" />;
  if (error) return <h1 className="spinner">{error.message}</h1>;
  return typeof data[0] !== "undefined" ? (
    <div className="myEvents">
      <button onClick={refrech} className="btn-refrech">
        <i className="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <div className="dash-content">
        <div className="myevents-container">
          {data.map((e) => (
            <div className="Card-container" key={e._id}>
              <Card event={e} refrech={() => refrech()} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1 className="spinner">You havent created any events yet</h1>
  );
}
