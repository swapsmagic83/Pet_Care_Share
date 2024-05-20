import React from "react";
import { NavLink } from "react-router-dom";
import {Navbar} from "reactstrap"


const NavBar = ({currentUserName}) =>{
    return (
        <div>
            <Navbar>
                <NavLink to='/'>Home</NavLink>
                {currentUserName && <NavLink to='/posts/new'>Add Post</NavLink>}
                {currentUserName && <NavLink to='/posts'>Posts</NavLink>}
                {/* {currentUserName && <NavLink to='/profile'>Profile</NavLink>} */}
                {!currentUserName && <NavLink to='/login'>login</NavLink>}
                {!currentUserName && <NavLink to='/register'>SignUp</NavLink>}
                {currentUserName && <NavLink to='/logout'>Logout</NavLink>}
            </Navbar>
        </div>
    )

}
export default NavBar