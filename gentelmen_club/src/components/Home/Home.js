import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../img/logo.png";
import "./Home.css";
import axios from "axios";

function Home(props) {
  const { register, handleSubmit } = useForm();

  const Submit = async (data) => {
    await axios
      .post("/api/user/login", data)
      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt.token);
        axios.defaults.headers["authorization"] =
          "Bearer " + res.data.jwt.token;
        window.location.replace(`/dashboard`);
        props.refresh();
        props.setRedirect(true);
      })
      .catch((err) => {
        if (err.response) console.log(err.response);
        else console.log("ERROR from JS");
      });
  };

  return (
    <div className="cover-shade">
      <div className="home-container">
        <div className="left-content">
          <img src={logo} className="logo" alt="Broken" />
          <h1>This club is for members only</h1>
          <h3>want to join our club?</h3>
          <h2>All you need to do is create an account</h2>
          <a href="/form" className="btn-signup">
            Create Account
          </a>
        </div>
        <form className="right-content" onSubmit={handleSubmit(Submit)}>
          <div>
            <h1>Already a member !</h1>
            <h1>Let me take your coat</h1>
          </div>
          <input
            type="email"
            placeholder="Enter Your E-Mail"
            required={true}
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            required={true}
            {...register("password")}
          />
          <button type="submit" className="btn-signin">
            Sign in <i className="fa-brands fa-redhat"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
