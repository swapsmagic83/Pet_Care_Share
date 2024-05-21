const db = require("../db")
const bcrypt = require("bcrypt")
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");
  
  const { BCRYPT_WORK_FACTOR } = require("../config.js");

// function for users//

class User {
     /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/
  static async authenticate(username,password){
    const result = await db.query(
                `select 
                username, 
                password, 
                first_name, 
                last_name,
                email, 
                is_admin from users
                where username = $1`,[username])
            const user = result.rows[0]

            if(user){
                const isValid = await bcrypt.compare(password,user.password)
                if(isValid === true){
                    delete user.password
                    return user
                }
            }
            throw new UnauthorizedError("Invalid username/password")
  }
    //  Register user with data
    // return {id,username,hashedpassword,first_name,last_name,email,is_admin}
    // throw BadRequestError on duplicate

    static async register(
            {username,password,first_name,last_name,email,is_admin}){
        const duplicateCheck = await db.query(
                            `select username
                            from users
                            where username = $1`,
                            [username])
            if(duplicateCheck.rows[0]){
                throw new BadRequestError(`Duplicate username: ${username}`)
            }

            const hashedpassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

            const result = await db.query(
                          `insert into users
                          (username,
                            password,
                            first_name,
                            last_name,
                            email,
                            is_admin)
                            values ($1,$2, $3, $4, $5, $6)
                            returning id, username, first_name, last_name, email, is_admin`,
                            [username, 
                            hashedpassword,
                            first_name,
                            last_name,
                            email,
                            is_admin
                            ]  
            )
            const user = result.rows[0]
            return user
            
    }
//finadAll gets all the user
    static async findAll(){
        const result = await db.query(
            `select username,
            first_name,
            last_name,
            email,
            is_admin
            from users`
        )
        return result.rows
    }
//getUserId will take username input and will get user_id where username=input username 
    static async getUserId(username){
        const result = await db.query(
                    `select id
                    from users
                    where 
                    username = $1`,
                    [username]
        )
        return result.rows[0]
    }
//getUser method with take username input and will return user object will all details
    static async getUser(username){
        const result = await db.query(
            `select username,
            first_name,
            last_name,
            email,
            is_admin
            from users
            where username = $1`,
            [username]
        )
        const user = result.rows[0]
        if (!user){
            throw new NotFoundError(`No user ${username}`)
        }
        return user
    }
    
    static async getUserName(id){
        const result = await db.query(
                    `select username
                    from users
                    where
                    id = $1`,
                    [id]
        )
        const user_id = result.rows[0]
        return user_id
    }

    static async deleteUser(username){
        const result = await db.query(
            `delete from users
            where username = $1`,
            [username]
        )
        const user = result.rows[0]
        if(!user){
            throw new NotFoundError(`No user ${username}`)
        }
    }
         
    

}
module.exports = User