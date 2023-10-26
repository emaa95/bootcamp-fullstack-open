import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Blog from './Blog'

function BlogLIst() {
  const blogs = useSelector(state => state.blog)
  
  const orderedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
        {orderedByLikes.map(blog => <Blog key ={blog.id} blog={blog}></Blog>)}
    </div>
  )
}

export default BlogLIst