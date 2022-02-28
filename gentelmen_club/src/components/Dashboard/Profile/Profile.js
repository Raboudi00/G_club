import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "./Profile.css";
import img from "../../../img/bg-sign-up-cover.jpeg";
//import propic from "../../../img/team-5.jpg";
import emptyPic from "../../../assets/images/emptyPic.jpeg";

function Profile(props) {
  const [description, setDescription] = useState(props.user.info);
  const user = props.user;

  const update = async (name) => {
    try {
      const userID = props.user.id;
      await axios
        .patch(`/api/user/${userID}`, { info: name })
        .then((res) => setDescription(res.data.info))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(props.user);
  const Edit = () =>
    swal({
      text: "Be creative.",
      content: "input",
      button: {
        text: "Edit",
        type: "success",
        closeModal: true,
      },
    })
      .then((name) => {
        if (name) {
          update(name);
        }
      })
      .catch((err) => console.log(err));

  return (
    <div className="dash-content">
      <div className="dash-header">
        <img alt="brkn" src={img} className="header-img" />
      </div>
      <div className="dash-main">
        <div className="profile-bar">
          <span className="profile-bar-left">
            <img src={emptyPic} alt="broken" className="propic" />
            <div>
              <h2>
                {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
                {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
              </h2>
              <p>Designer</p>
            </div>
          </span>
          <i className="fa-solid fa-gear"></i>
        </div>

        <div className="profile-info">
          <h2 className="text-title">Profile information</h2>

          {!user.info ? (
            <i className="fa-solid fa-plus create-info" onClick={Edit}>
              {" "}
              Add description
            </i>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>{description}</p>
              <i
                className="fa-solid fa-plus"
                onClick={Edit}
                style={{ fontSize: "20px", cursor: "pointer" }}
              ></i>
            </div>
          )}
          <hr className="divider" />

          <span className="info-2">
            <div className="info-2-left">
              <div>
                <h3>Full Name: </h3>
                <p>
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
                  {user.lastName.charAt(0).toUpperCase() +
                    user.lastName.slice(1)}
                </p>
              </div>
              <div>
                <h3>Mobile: </h3>
                <p>(44) 123 1234 123</p>
              </div>
              <div>
                <h3>Email: </h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3>Social: </h3>
                <i
                  className="fa-brands fa-facebook-square"
                  style={{ fontSize: "25px", color: "rgb(59, 89, 152)" }}
                ></i>
                <i
                  className="fa-brands fa-twitter-square"
                  style={{ fontSize: "25px", color: "rgb(85, 172, 238)" }}
                ></i>
                <i
                  className="fa-brands fa-instagram-square"
                  style={{ fontSize: "25px", color: "rgb(18, 86, 136)" }}
                ></i>
              </div>
            </div>
            <div className="mid"></div>
            <div className="info-2-right">
              <h2>Conversations</h2>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
