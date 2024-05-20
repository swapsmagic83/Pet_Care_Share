import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import PetsApi from "./api";
import NewCommentForm from "./NewCommentForm";

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
        (<div>
            <p>{username}</p>
            <p>{post.description}</p>
            <p>Date From: {post.date_from}</p>
            <p>Date To: {post.date_to}</p>
            <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.username}: {comment.content}</li>
            ))}
          </ul>
          <NewCommentForm addNewComment={addNewComment} username={username} id={id}/>
        </div>)}
        </>
    )
}
export default PostDetails