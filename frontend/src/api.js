import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PetsApi {
    static token 
    // = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYjEiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxNTg5MzMwN30.6X6GsidD00eVpcGKA688vKbmoEObFk1MNhx6sLWzu4I"

    
    static async request(endpoint, data = {}, method = "get", sendHeader = true) {
        // console.log("API Call:", endpoint, data, method);
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        let headers = {};
        if (sendHeader) {
            headers = { Authorization: `Bearer ${PetsApi.token}` };
        } else {
            headers = {}
        }
        
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }
    //sets token
      static async setToken(token) {
        this.token = token
      }

      // Individual API routes
      //registers user//
      static async register(data){
        let res = await this.request(`auth/register`,data,"post",false)
        this.token =res.token
        return res.token
      }
      //user login//
      static async login(data){
        let res = await this.request(`auth/token`,data,"post",false)
        this.token =res.token
        return res.token
      }
      //gets all the posts//
      static async getAllPosts(){
        let res = await this.request(`posts`)
        return res.posts
      }
      //takes id input and gives single post of that id 
      static async getSinglePost(id){
        let res = await this.request(`posts/${id}`)
        return res.post
      }
      
      //takes (username,description,date_to,date_from) input and give post
      static async addNewPost(username, description, date_to, date_from){
        let newData = {username, description, date_from, date_to}
        let res = await this.request(`posts/new`,newData,"post")
        return res.post
      }
      //takes username and gives user_id
      static async getUserIdFromUserName(username){
        let res = await this.request(`users/${username}`)
        return res.id
      }
      //takes post_id and gives comments of post with that id
      static async getAllCommentsOfPost(post_id){
        let res = await this.request(`posts/${post_id}/comments`)
        return res[0]
      }
      //takes(username,post_id,content) and adds new comment
      static async addNewCommentToPost(username,post_id,content){
        let res = await this.request(`posts/${post_id}/newcomment`,{username,content},"post")
        return res.comment
      }
}

export default PetsApi