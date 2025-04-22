const Post = require('../model/Post');
// Controller to handle post-related requests
// Get All Posts (Read)
const servePosts = async (req, res) => {
    const postsList = await Post.list();
    res.send(postsList);
};

// Get One Post (Read)
const servePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.find(Number(id));

    if (!post) {
        return res.status(404).send({
            message: `No post with the id ${id}`
        });
    }
    res.send(post);
};

// Get all posts 
const serveAllPosts = async (req, res) => {
    const postsList = await Post.list();
    res.send(postsList);
}

// Create Post
const createPost = async (req, res) => {
    const { content, fellowId } = req.body;
    if (!content || !fellowId) {
        return res.status(400).send({ message: "Invalid content or fellowId" });
    }

    const newPost = await Post.create(content, Number(fellowId));
    res.send(newPost);
};
// Update Post
const updatePost = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).send({ message: "Invalid content" });
    }

    const { id } = req.params;
    const updatedPost = await Post.editContent(Number(id), content);

    if (!updatedPost) {
        return res.status(404).send({
            message: `No post with the id ${id}`
        });
    }

    res.send(updatedPost);
};

// Delete Post
const deletePost = async (req, res) => {
    const { id } = req.params;
    const didDelete = await Post.delete(Number(id));

    if (!didDelete) {
        return res.status(404).send({
            message: `No post with the id ${id}`
        });
    }

    res.send({ message: `Post with id ${id} deleted successfully` });
};
// Get Posts by Fellow ID
const servePostsByFellowId = async (req, res) => {
    const { id } = req.params;
    const postsList = await Post.findPostsByFellowId(Number(id));

    if (!postsList || postsList.length === 0) {
        return res.status(404).send({
            message: `No posts found for fellow with id ${id}`
        });
    }
    res.send(postsList);
};

const deleteAllPostsByFellowId = async (req, res) => {
    const { fellowId } = req.params;
    const didDelete = await Post.deleteAllPostsByFellowId(Number(fellowId));

    if (!didDelete) {
        return res.status(404).send({
            message: `No posts found for fellow with id ${fellowId}`
        });
    }

    res.send({ message: `All posts for fellow with id ${fellowId} deleted successfully` });
};

module.exports = {
    servePosts,
    servePost,
    serveAllPosts,
    createPost,
    updatePost,
    deletePost,
    servePostsByFellowId,
    deleteAllPostsByFellowId
};