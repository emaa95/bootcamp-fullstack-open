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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};