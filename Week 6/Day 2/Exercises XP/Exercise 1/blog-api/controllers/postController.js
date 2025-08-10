const post = require('../models/post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await post.toGetAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await post.toGetPostById(id);

        if(!id){
            return res.status(400).json({
                success: false,
                errors: "post ID is required",
            })
        }

        if(!post){
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const newPost = await post.toCreatePost({ title, content });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        if (!title && !content) {
            return res.status(400).json({ error: 'At least one field (title or content) is required' });
        }
        const result = await post.toUpdatePost(id, title, content);
        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await post.toDeletePost(id);
        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
