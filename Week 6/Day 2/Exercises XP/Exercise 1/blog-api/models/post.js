const db = require('../config/db.js');

const Posts = {
    async toCreatePost({title, content}) {
        return await db('posts')
            .insert({ title, content })
            .returning('*');
    },

    async toGetAllPosts() {
        return await db('posts')
            .orderBy('created_at', 'asc');
    },

    async toGetPostById(id) {
        return await db('posts')
            .where({ id })
            .first();
    },

    async toUpdatePost(id, title, content) {
        return await db('posts')
            .where({ id })
            .update({
                title: title || db.raw('title'),
                content: content || db.raw('content')
            })
            .returning('*');
    },

    async toDeletePost(id) {
        return await db('posts')
            .where({ id })
            .del()
            .returning('*');
    }
};


module.exports = Posts;