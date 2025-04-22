import handleFetch from "./handleFetch";

export const getAllPosts = async () => {
  const [allPosts, error] = await handleFetch('/api/posts/');
  return [allPosts, error];
}
export const getPostById = async (id) => {
  const [post, error] = await handleFetch(`/api/posts/${id}`);
  return [post, error];
}
export const createPost = async (content, fellowId) => {    
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ content, fellowId })
  }

  const [newPost, error] = await handleFetch(`/api/posts/`, options);
  return [newPost, error];
}
export const deletePost = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(`/api/posts/${id}`, options);
  return [success, error];
}
export const updatePostContent = async (id, content) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ content })
  };

  const [updatedPost, error] = await handleFetch(`/api/posts/${id}`, options);
  return [updatedPost, error];
}
export const getPostsByFellowId = async (fellowId) => {
  const [posts, error] = await handleFetch(`/api/fellows/${fellowId}/posts`);
  return [posts, error];
}
export const deleteAllPostsByFellowId = async (fellowId) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(`/api/fellows/${fellowId}/posts`, options);
  return [success, error];
}

export const getAllPostsByFellowId = async (fellowId) => {
  const [posts, error] = await handleFetch(`/api/fellows/${fellowId}/posts`);
  return [posts, error];
}