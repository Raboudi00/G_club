import React from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Form(props) {
  const { register, handleSubmit } = useForm("");

  const Register = async (data) => {
    await axios
      .post("/api/user/register", data)
      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt.token);
        axios.defaults.headers["authorization"] =
          "Bearer " + res.data.jwt.token;
        window.location.replace(`/dashboard`);
        props.setUser({ loadingUser: false, user: res.data.user });
        props.redirect(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="signup" onSubmit={handleSubmit(Register)}>
      <div className="form-container">
        <span className="row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="form-control"
              id="firstName"
              placeholder="name"
            />
          </div>

          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              className="form-control"
              id="lastName"
              placeholder="last name"
            />
          </div>
        </span>

        <span className="row">
          <div className="col">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="email"
            />
          </div>
          <div className="col">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="password"
            />
          </div>
        </span>
        <span className="row">
          <div className="col">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              {...register("address")}
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              {...register("city")}
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="city"
            />
          </div>
        </span>

        <span className="row">
          <div className="col">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <input
              {...register("state")}
              type="text"
              className="form-control"
              id="inputState"
              placeholder="state"
            />
          </div>
          <div className="col zip">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              {...register("zip")}
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="ZIP code"
            />
          </div>
        </span>

        <div className="check">
          <div className="form-check">
            <input
              {...register("terms")}
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I Agree on terms and conditions
            </label>
          </div>

          <div className="form-check">
            <input
              {...register("newsLetter")}
              className="form-check-input"
              type="checkbox"
              id="gridChecked"
            />
            <label className="form-check-label" htmlFor="gridChecked">
              Register to news letter
            </label>
          </div>
        </div>

        <div className="btn-submit">
          <button type="submit" className="btn">
            Sign up
          </button>
          <a href="/" className="btn">
            Home{" "}
          </a>
        </div>
      </div>
    </form>
  );
}

export default Form;
