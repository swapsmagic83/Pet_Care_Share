import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import RoutesList from './RoutesList';
import PetsApi from './api';
import './Home.css'


function App() {
  const [token,setToken] = useState(localStorage.getItem('token')||'')
  const [currentUserName, setCurrentUserName] = useState(localStorage.getItem('username') ||'')
  const [err,setErr]=useState(null)
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      PetsApi.setToken(token);
      setToken(token);
    }
  }, []);
  async function loginUser(data){
    try{
      let token = await PetsApi.login(data)
      localStorage.setItem('token',token)
      localStorage.setItem('username',data.username)
      setToken(token)
      setCurrentUserName(data.username)
      setErr(null)
      return true

    }catch(err){
      console.error('Invalid username/password',err)
      setErr(err)
    }
  }
  async function addPost(description,date_to,date_from){
    let username=currentUserName
    let newPost = await PetsApi.addNewPost(username, description,date_to,date_from)
}



  async function registerUser(data){
    try{
      let token = await PetsApi.register(data)
      localStorage.setItem('token',token)
      localStorage.setItem('username',data.username)
      setToken(token)
      setCurrentUserName(data.username)
      setErr(null)
      return true

    }catch(err){
      console.error('Sign up Failed',err)
      setErr(err)
    }
  } 

  async function logoutUser(){
    setToken('')
    setCurrentUserName('')
    localStorage.setItem('token','')
    localStorage.setItem('username','')
  } 

  return (
    <div className="App">
     
     <BrowserRouter>
      <NavBar currentUserName={currentUserName}/>
        <RoutesList 
          username={currentUserName} 
          loginUser={loginUser}
          registerUser={registerUser}
          logoutUser={logoutUser}
          addPost={addPost}
          />
          <p style={{color:'red'}}><b>{err}</b></p>
     </BrowserRouter>
    </div>
  );
}

export default App;
