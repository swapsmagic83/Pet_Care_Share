import React,{useState} from "react"
import { Navigate } from "react-router-dom"



const LogoutForm =({logoutUser}) =>{
    logoutUser();

    return (
        
        <Navigate to='/'/>
    )

}
export default LogoutForm