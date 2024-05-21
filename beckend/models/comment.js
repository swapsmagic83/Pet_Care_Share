const db = require("../db")

class Comment {
    static async createComment(user_id,post_id,content){
        const result = await db.query(
                        `insert into comments
                        (user_id, post_id, content)
                        values ($1, $2, $3)
                        returning id, user_id,post_id,content`,
                        [user_id,post_id,content]
        )
        const comment =result.rows[0]
        return comment
    }

    static async getAllComments(post_id){
        console.log("Inside get All Comments: ", post_id)
        const result = await db.query(
                        `select 
                        comments.id,
                        users.username,
                        comments.post_id,
                        comments.content,
                        comments.created_at
                        from comments
                        join users 
                        on comments.user_id =
                        users.id
                        where 
                        post_id = $1
                        order by created_at 
                        desc`,
                        [post_id]
        )
        const comments =result.rows
        return comments
    }
}
module.exports = Comment