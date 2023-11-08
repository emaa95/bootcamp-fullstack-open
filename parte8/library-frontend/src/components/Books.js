import { useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('All genres')

  useEffect(() => {
    if (result.data) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
    }
  }, [result])

  const uniqueGenres = [...new Set(['All genres', ...books.map(book => book.genres).flat()])]

  const filteredBooks = selectedGenre === 'All genres' ? books : books.filter(b => b.genres.includes(selectedGenre))

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{selectedGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {uniqueGenres.map((genre) => (
        <button onClick={() => setSelectedGenre(genre)} key={genre}>
        {genre}
        </button>
        ))}
      </div>
    </div>
  )
}

export default Books
