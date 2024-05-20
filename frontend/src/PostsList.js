import React, {useState, useEffect} from "react";
import PetsApi from "./api";
import PostCard from "./PostCard";
const PostsList = ({username}) =>{
    const [posts, setPosts] = useState([])
    const [isLoading,setIsLoading]= useState(true)

    useEffect(()=>{
        async function getAllPosts(){
            const token = localStorage.getItem('token');
            if (token) {
                PetsApi.setToken(token);
            }
            let posts = await PetsApi.getAllPosts()
            setPosts(posts)
            setIsLoading(false)
        }
        getAllPosts()
    },[])
    

    return (
        <>
        {isLoading ? (
            <p>Loading... </p> ):
        (<div>
            <h1>Posts list here {username}</h1>
            {posts.map(post =>(
                <PostCard 
                key={post.id}
                id={post.id}
                description={post.description}
                date_to={post.date_to}
                date_from={post.date_from}/>
            ))}
        </div>)
        }
        </>
    )
}
export default PostsList