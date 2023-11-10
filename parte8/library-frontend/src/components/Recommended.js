import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS_WITH_GENRE, ME } from "../queries"
import { useEffect, useState } from "react"


const Recommended = ({show}) => {

    const currentUser = useQuery(ME)
    const [getFavoriteBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE)
    const [favoriteBooks, setFavoriteBooks] = useState([])
    
    useEffect(() => {
        if (result.data) {
            setFavoriteBooks(result.data.allBooks)
        }
    }, [setFavoriteBooks, result])

    useEffect(() => { 
        if (currentUser.data && currentUser.data.me ) {
            getFavoriteBooks({ variables: { genre: currentUser.data.me.favoriteGenre}})
        }
    }, [getFavoriteBooks, currentUser])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre: {currentUser.data.me.favoriteGenre}</p>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Recommended