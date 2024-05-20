import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Home from "./Home";
import SignUpForm from "./SignUpForm";
import LogoutForm from "./LogOutForm";
import PostsList from "./PostsList";
import PostDetails from "./PostDetails";
import NewPostForm from "./NewPostForm";

const RoutesList = ({username,loginUser,registerUser,logoutUser,addPost}) =>{
    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<Home username={username}/>}></Route>
                    {username && <Route path="/posts/new" element={<NewPostForm addPost={addPost} username={username}/>}></Route>}
                    {username && <Route path="/posts" element={<PostsList username={username}/>}></Route>}
                    {username && <Route path="/posts/:id" element={<PostDetails username={username}  />}></Route>}
                    {!username && <Route path="/login" element={<LoginForm loginUser={loginUser}/>}></Route>}
                    {!username && <Route path="/register" element={<SignUpForm registerUser={registerUser}/>}></Route>}
                    {username && <Route path="/logout" element={<LogoutForm logoutUser={logoutUser}/>}></Route>}
                    
                </Routes>
               
            </main>
        </div>
    )
}
export default RoutesList