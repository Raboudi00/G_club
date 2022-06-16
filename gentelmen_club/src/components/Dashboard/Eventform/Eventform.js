import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import ImageUpload from "./Upload";
import "./Eventform.css";

function Card(props) {
  const { register, handleSubmit } = useForm("");
  const [err, setErr] = React.useState("");

  const Register = (data, e) => {
    e.preventDefault();
    axios
      .post("/api/event", data)
      .then((res) => {
        const msg = res.data.errors;
        if (msg) return setErr(msg);
        swal("Your event has been created", {
          icon: "success",
        });
        setErr("");
        e.target.reset();
        props.refrech();
      })
      .catch((error) => console.log("error", error));
  };

  const ErrMsg = ({ name }) => {
    return err[name] ? <p className="error-msg"> {err[name].message}</p> : null;
  };

  return (
    <form className="eventForm-container" onSubmit={handleSubmit(Register)}>
      <ImageUpload />

      <div className="eventForm-input">
        <span className="event">
          <p>Title:</p>

          <input
            {...register("title")}
            type="text"
            className="event-title"
            placeholder="Choose a title"
          />
          <ErrMsg name={"title"} />
        </span>
      </div>
      <div className="eventForm-input">
        <span className="event">
          <p> date:</p>
          <input {...register("date")} type="date" />
          <ErrMsg name={"date"} />
        </span>
        <span className="event">
          <p> time:</p>
          <input {...register("time")} type="time" />
        </span>
        <span className="event">
          <p>address: </p>
          <input {...register("address")} type="text" />
          <ErrMsg name={"address"} />
        </span>
        <span className="event">
          <p>city</p>
          <input {...register("city")} type="text" />
          <ErrMsg name={"city"} />
        </span>

        <span className="event">
          <p>description:</p>
          <textarea
            {...register("description")}
            className="event-description"
            placeholder="Describe your event "
          />
          <ErrMsg name={"description"} />
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20%",
          width: "60%",
        }}
      >
        <label htmlFor="public" style={{ display: "flex", flexBasis: "50%" }}>
          Public
          <input
            {...register("public")}
            type="radio"
            id="public"
            name="priv"
            className="priv"
            defaultChecked
            value={true}
          />
        </label>
        <label htmlFor="private" style={{ display: "flex", flexBasis: "50%" }}>
          Private{" "}
          <input
            {...register("public")}
            type="radio"
            id="private"
            name="priv"
            className="priv"
            value={false}
          />
        </label>
      </div>
      <div className="edit-btn">
        <button type="submit">
          Post <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    </form>
  );
}

export default Card;
