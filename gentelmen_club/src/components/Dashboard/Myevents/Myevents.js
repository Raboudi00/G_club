import React from "react";
import {Link} from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from "../Eventcard";
import spinner from "../../../img/spinner.gif";
import "./Myevents.css";

export default function Myevents(props) {
// const [result, setResult] = React.useState([])
// const [page, setPage] = React.useState(0)
const {data, loading, error} = props.result
const refrech = props.refrech


function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 20;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);


  if (loading) return <img className="spinner" src={spinner} alt="brkn" />;
  
  if (error) return <h1 className="spinner">{error.message}</h1>;
  return typeof data[0] !== "undefined" ? (
   
    <div className="myEvents">
       
      <button onClick={refrech} className="btn-refrech">
        <i className="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <div className="dash-content">
      <div className="myevents-container">
      
          {data.map((e, index) => (
            <Link to={`/dashboard/myevent/${e._id}`} className={`Card-container ${index > 2 && "reveal"}`} key={e._id}>
            
              <Card event={e} refrech={() => refrech()} />
            
            </Link>
          ))}
        </div> 
      </div>
    </div>
    
  ) : (
    <div>
    <h1 className="spinner" style={{cursor: "pointer"}} onClick={refrech}>You havent created any events yet <i className="fa-solid fa-arrow-rotate-right"></i></h1>
    
        
      
    </div>
  );
}
