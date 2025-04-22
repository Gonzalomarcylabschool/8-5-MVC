/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFellowById, updateFellowName, deleteFellow } from '../adapters/fellowAdapters';
import {getAllPostsByFellowId,  createPost, deletePost} from '../adapters/postAdapters';

const FellowDetails = () => {
  const [fellow, setFellow] = useState({})
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newFellowName, setNewFellowName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // on load, get the fellow by id
  useEffect(() => {
    const doFetch = async () => {
      const [foundFellow, error] = await getFellowById(id);
      const [allPosts, error2] = await getAllPostsByFellowId(id);
      console.log(allPosts)
      setFellow(foundFellow);
      if(allPosts.length) {
        setPosts(allPosts);
      }
    };
    doFetch();
  }, [newPostContent])

  // when the delete button is pressed, send a DELETE request
  const handleDeleteFellow = async () => {
    await deleteFellow(id);
    navigate('/');
  }

  // when the form is filled out, send a PATCH request
  const handleUpdateFellow = async (e) => {
    e.preventDefault();

    const [updatedFellow, error] = await updateFellowName(id, newFellowName);
    setFellow(updatedFellow);

    setNewFellowName('');
  }
  const handelCreatePost = async (e) => {
    e.preventDefault();
    const [newPost, error] = await createPost(newPostContent, id);
    setPosts([...posts, newPost]);
    setNewPostContent('');
  }



  return (
    <>
      <Link to='/'>Go Home</Link>
      <h1>Fellow Details</h1>
      <p>Name: {fellow.name}</p>
      <p>Id: {fellow.id}</p>
      <form onSubmit={handleUpdateFellow}>
        <label htmlFor="name">Update Fellow Name</label>
        <input type="text" name="name" id="name" value={newFellowName} onChange={(e) => setNewFellowName(e.target.value)} placeholder='New Name' />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeleteFellow} className='danger'>Delete Fellow</button>
      <section>
        <h2>Posts</h2>
        <form onSubmit={handelCreatePost}>
          <h3>New Post</h3>
          <label htmlFor="post">Create Post</label>
          <input type="text" name="post" id="post" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder='New Post' />
          <button type="submit">Submit</button>
        </form>
        <ul>
        {posts.length > 0
          ? posts.map((post) => (
              <li key={post.id || `temp-${Math.random()}`}>
                <p>{post.post_content}</p>
                <button onClick={() => {
                  deletePost(post.id)
                  setPosts(posts.filter((allPost) => allPost.id !== post.id));
    
                  }}>Delete</button>
              </li>
            ))
          : <p>No posts yet</p>}
      </ul>
      </section>
    </>
  )
}

export default FellowDetails;