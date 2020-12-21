import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  addPostFetch,
  selectSetEditPost,
  setEditPost, 
  addEditPostFetch
} from '../redux/postSlice'

export function PostForm(){
  const editPost = useSelector(selectSetEditPost)
  const dispatch = useDispatch();



  const submitHandler = (e) => {
    e.preventDefault();
    if (editPost._id){
      dispatch(addEditPostFetch(editPost))
    } else {
      dispatch(addPostFetch(editPost))
    }
  }

  const changeHandler = (e) => {
    let post = {...editPost}
    if (e.target.id === 'title'){
      post.title = e.target.value
    } else if (e.target.id === 'content'){
      post.content = e.target.value
    }
    dispatch(setEditPost(post))
  }



  return (
    <form onSubmit={e => submitHandler(e)}>
      <label>Title</label>
      <input 
        type="text" 
        name="title" 
        id="title" 
        placeholder="Title..." 
        value={editPost.title} 
        onChange={e => changeHandler(e)}/>
        <br />
      <label>Content</label>
      <input 
        type="text"
        name="content" 
        id="content" placeholder="Content..." 
        value={editPost.content} 
        onChange={e => changeHandler(e)}/>
        <br/>
      <button type="submit" >Submit</button>
    </form>
  )
}