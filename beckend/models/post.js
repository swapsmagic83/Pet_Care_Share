const db = require('../db')


class Post {
    static async createPost(user_id,description,date_from,date_to){
        const result= await db.query(
                    `insert into posts
                    (user_id,description, date_from, date_to)
                    values ($1, $2, $3, $4) returning 
                    id,user_id,description,date_from,date_to`,
                    [user_id,description,date_from,date_to]
        )
        const post = result.rows[0]
        return post
    }

    static async getAllPosts(){
        const result = await db.query(
                    `select 
                    id, 
                    user_id, 
                    description, 
                    date_to, 
                    date_from
                    from posts
                    order by created_at
                    desc`
        )
        const posts = result.rows
        return posts
    }

    static async getSinglePost(id){
        const result = await db.query(
                    `select 
                    id,
                    user_id,
                    description,
                    date_to,
                    date_from 
                    from posts
                    where
                    id = $1`,
                    [id]
        )
        const post = result.rows[0]
        return post
    }

    static async deletePost(id){
        const result = await db.query(
                    `delete from post
                    where 
                    id = $1`,
                    [id]
        )
        const {post} = result.rows[0]

    }
}
module.exports = Post