import React from "react";
// import "./Home.css"


const Home = ({username}) =>{
    return(
        <div className="Home">
        <h1 >Pet Care Share</h1>
        <h1 >Welcome {username} </h1>
        </div>
    )
}
export default Home