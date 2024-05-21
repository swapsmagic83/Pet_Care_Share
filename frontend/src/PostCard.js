import React from "react";
import { Link } from "react-router-dom";
import './Post.css'

const PostCard = ({id,description,date_to,date_from}) =>{
    return (
        <div className="PostCard">
        <Link to={`/posts/${id}`}>
             <div className="p">
                <p><small> {description}</small></p>
                <p><small> Date From: {date_from}</small></p>
                <p><small> Date To: {date_to}</small></p>
            </div>
        </Link>
        </div>
    )
}
export default PostCard