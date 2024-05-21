import React from "react";
import { NavLink } from "react-router-dom";
import {Navbar} from "reactstrap"
import './Home.css'


const NavBar = ({currentUserName}) =>{
    return (
        <div className="NavBar">
            <Navbar >
                <NavLink className="NavBar-NavLink"  to='/'>Home</NavLink>
                {currentUserName && <NavLink className="NavBar-NavLink" to='/posts/new'>AddPost</NavLink>}
                {currentUserName && <NavLink className="NavBar-NavLink" to='/posts'>Posts</NavLink>}
                {/* {currentUserName && <NavLink to='/profile'>Profile</NavLink>} */}
                {!currentUserName && <NavLink className="NavBar-NavLink" to='/login'>login</NavLink>}
                {!currentUserName && <NavLink className="NavBar-NavLink" to='/register'>SignUp</NavLink>}
                {currentUserName && <NavLink className="NavBar-NavLink" to='/logout'>Logout</NavLink>}
            </Navbar>
        </div>
    )

}
export default NavBar