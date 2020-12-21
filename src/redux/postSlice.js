import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    post: {},
    errors: [],
    editPost: {title: '', content: ''},
  },
  reducers: {
    fetchAll: (state, action )=> {
      state.posts = action.payload.posts
    },
    fetchById: (state, action) => {
      state.post = action.payload.post
    },
    errorCatch: (state, action) => {
      state.errors.push(action.payload)
    },
    addPost: (state, action) => {
      state.posts.push(action.payload.post);
      state.editPost = {title: '', content: ''};
    },
    addEditPost: (state, action) => {
      const idx = state.posts.findIndex(post => post._id === action.payload.post._id);
      state.posts[idx] = action.payload.post;
      state.editPost = {title: '', content: ''};
    },
    setEditPost: (state, action) => {
      state.editPost = action.payload
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload)
    }
  },
});

export const { fetchAll, fetchById, errorCatch, addPost, setEditPost, deletePost, addEditPost} = postSlice.actions;

export const postIndexFetch = () => dispatch => {
  fetch('http://localhost:8000/posts')
    .then(resp=>resp.json())
    .then(data => dispatch(fetchAll(data)))
    .catch(err => dispatch(errorCatch(err)))
};

export const addPostFetch = (post) => 
  dispatch => {
    const configObj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accepts' : 'application/json'
      },
      body: JSON.stringify(post)
    }
    fetch('http://localhost:8000/post', configObj)
      .then(resp => resp.json())
      .then(data => dispatch(addPost(data)))
      .catch(err => dispatch(errorCatch(err)))
  }

export const addEditPostFetch = (post) => dispatch => {
  const configObj = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'accepts' : 'application/json'
    },
    body: JSON.stringify(post)
  }
  fetch(`http://localhost:8000/post/${post._id}`, configObj)
    .then(resp => resp.json())
    .then(data => dispatch(addEditPost(data)))
    .catch(err => dispatch(errorCatch(err)))
} 

export const deletePostFetch = (postId) => dispatch => {
  const configObj = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'accepts' : 'application/json'
    }
  }
  fetch(`http://localhost:8000/post/${postId}`, configObj)
    .then(resp => resp.json())
    .then(pId => dispatch(deletePost(pId)))
    .catch(err => dispatch(errorCatch(err)))
}


export const selectErrors = state => state.post.errors;
export const selectPosts = state => state.post.posts;
export const selectPost = state => state.post.post;
export const selectSetEditPost = state => state.post.editPost;
export const selectSetDeletePost = state => state.post.deletePost;

export default postSlice.reducer;
