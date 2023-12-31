const listHelper = require('../utils/list_helper')
const blogs = [
    {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    },
    {
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }  
  ]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    
    test('if the list is empty, the total number of likes is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
      const blog = blogs[0]
      const result = listHelper.totalLikes([blog])
      expect(result).toBe(blog.likes)

    })

    test('for a bigger list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
  test('if the list is empty the value is {}', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('if the list has only one blog it is equal to that blog',() => {
    const blog = blogs[0]
    const maxLikes = listHelper.favoriteBlog([blog])
    const favoriteBlog = blogs.find(blog => blog.likes === maxLikes.likes)
    expect(favoriteBlog).toEqual(blog)
  })

  test('if the list has more than one blog it works correctly', () => {
    const maxLikes = listHelper.favoriteBlog(blogs)
    expect(maxLikes).toEqual({
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    })

  })
})

describe('most blogs', () => {
  test('if the list is empty the value is {}', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('if the list has only one blog it is equal to the author of that blog', () => {
    const blog = blogs[0]
    const mostBlog = listHelper.mostBlogs([blog])
    expect(mostBlog).toEqual({
      author: blog.author, 
      blogs: 1 
    })
  })

  test('if the list has more than one blog it works correctly', () =>{
    const mostBlog = listHelper.mostBlogs(blogs)
    expect(mostBlog).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
} )

describe('most likes', ()=> {
  test('if the list is empty the value is {}', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('if the list has only one blog it is equal to the author of that blog', () => {

    const blog = blogs[0]
    const mostLikes = listHelper.mostLikes([blog])
    expect(mostLikes).toEqual({
      author: blog.author, 
      likes: 7 
    })
  })

  test('if the list has more than one blog it works correctly', () =>{
    const mostLikes = listHelper.mostLikes(blogs)
    expect(mostLikes).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  
})