import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import PetsApi from "./api";
import NewCommentForm from "./NewCommentForm";
import './Post.css'

const PostDetails = ({username}) =>{
    let {id} = useParams()
    const [post,setPost] = useState(null)
    const [isLoading,setIsLoading] =useState(true)
    const [comments, setComments] =useState([])
    const token = localStorage.getItem('token');
            if (token) {
                PetsApi.setToken(token);
            }

    useEffect(()=>{
        async function getOnePost(){
            let singlePost = await PetsApi.getSinglePost(id)
            setPost(singlePost)
            setIsLoading(false)    
        }
        getOnePost()
    },[id])

    useEffect(()=>{
        async function getAllComments(){
            let comments = await PetsApi.getAllCommentsOfPost(id)
            setComments(comments)
            
        }
        getAllComments()
    },[id])
    async function addNewComment(content){
        let newComment = await PetsApi.addNewCommentToPost(username,id,content)
        setComments([...comments,{username,content}])
        
    }
    return(
        <>
        
        {isLoading ? (
            <p>Loading...</p>
        ) :
        (<div className="PostDetail">
            <div className="Post-p">
            <p className="p">{post.description}</p>
            <p className="p"><small>Date From: {post.date_from}</small></p>
            <p className="p"><small>Date To: {post.date_to}</small></p>
            </div>
            <div className="Post-s">
           <small style={{color:"red"}}>{comments.length} comments:</small>
            {/* <ul> */}
            {/* <small>{comments.length} comments</small> */}
            {comments.map((comment, index) => (
              <small className="comment"  key={index}><b>{comment.username}</b>: {comment.content}</small>
            ))}
          {/* </ul> */}
          <NewCommentForm addNewComment={addNewComment} username={username} id={id}/>
          </div>
        </div>)}
        </>
    )
}
export default PostDetails