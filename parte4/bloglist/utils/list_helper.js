const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes , 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 
    ? {}
    : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes.likes ? blog : maxLikes, blogs[0])
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return {};
    }
    
      const authorCounts = _.countBy(blogs, 'author');
      const authorWithMostBlogs = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);
    
      return {
        author: authorWithMostBlogs,
        blogs: authorCounts[authorWithMostBlogs]
      };
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return {};
    }

    const authorLikes = blogs
    ? blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
      }, {})
    : {};

  const authorWithMostLikes = blogs
    ? _.maxBy(_.keys(authorLikes), author => authorLikes[author])
    : null;

  return {
    author: authorWithMostLikes,
    likes: authorWithMostLikes ? authorLikes[authorWithMostLikes] : 0
  };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs,
    mostLikes
};