import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'

function BlogLIst() {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogs = useSelector(state => state.blog)
  
  const orderedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
        {orderedByLikes.map(blog => <Link to={`/blogs/${blog.id}`}><p style={blogStyle} key={blog.id}>{blog.title}</p> </Link>)}
    </div>
  )
}

export default BlogLIst