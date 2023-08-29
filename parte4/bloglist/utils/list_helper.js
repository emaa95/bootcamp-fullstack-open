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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs
};