import React from "react";
import "./Eventcard.scss";
import axios from "axios";
import standardImg from "../../assets/images/home-decor-3.jpg";

class CardHeader extends React.Component {
  render() {
    const { image, date, id } = this.props;
    var style = {
      backgroundImage: "url(" + image + ")",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    };

    const Delete = async () => {
      await axios
        .delete(`api/event/${id}`)
        .then(() => this.props.refrech())
        .catch((err) => console.log(err));
    };

    return (
      <header style={style} id={image} className="card-header">
        <h4 className="card-header--title">{date && date.slice(0, 10)}</h4>
        <i className="fa-solid fa-trash" onClick={Delete}></i>
      </header>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> Find out more
      </button>
    );
  }
}

class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <p className="date">{this.props.address}</p>
        <hr style={{ width: "100%" }} />

        <h2 style={{ margin: "0px" }}>{this.props.title}</h2>

        <p className="body-content">{this.props.text}</p>

        <Button />
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const { title, address, description, image, date, _id } = this.props.event;

    return (
      <article className="card">
        <CardHeader
          id={_id}
          image={typeof image === "undefined" ? standardImg : image}
          date={date}
          refrech={() => this.props.refrech()}
        />
        <CardBody
          date={date}
          address={address}
          title={title}
          text={description}
        />
      </article>
    );
  }
}

export default Card;
