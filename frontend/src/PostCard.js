import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({id,description,date_to,date_from}) =>{
    return (
        
        <Link to={`/posts/${id}`}>
             <div style={{border: "1px solid black"}}>
                <p> {description}</p>
                <p>Date From: {date_from}</p>
                <p>Date To: {date_to}</p>
            </div>
        </Link>
    )
}
export default PostCard