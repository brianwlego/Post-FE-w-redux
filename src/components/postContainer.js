import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  selectPosts,
  selectPost,
  selectErrors,
  postIndexFetch,
  postShowFetch,
  selectSetEditPost,
  selectSetDeletePost,
  setEditPost,
  deletePostFetch,
} from '../redux/postSlice'
import { PostForm } from './postForm'

export function PostContainer(){
  const posts = useSelector(selectPosts)
  const post = useSelector(selectPost)
  const errors = useSelector(selectErrors)
  const editPost = useSelector(selectSetEditPost)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postIndexFetch())
  }, [])



  const renderPosts = () => {
    if (posts.length > 0){
      return posts.map(post => {
        return (
          <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={() => dispatch(setEditPost(post))}>Edit</button>
            <button onClick={() => dispatch(deletePostFetch(post._id))} >Delete</button>
          </div>
        )
      })
    } else {
      return <h1>No Posts</h1>
    }
  }

  return(
    <>
    {/* {console.log(editPost)} */}
      <h1>Here are my posts</h1>
      {renderPosts()}
      <PostForm />
    </>
  )
}

