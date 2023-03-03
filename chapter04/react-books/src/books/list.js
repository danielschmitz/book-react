import { useEffect, useState } from "react"
import service from "../service"

export default function ListBooks(params) {
  
    const [books, setBooks] = useState([])

    useEffect(() => {
      service.books.getAll().then(setBooks)
    },[])

    return <article>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publish</th>
          <th>% complete</th>
          <th>Category</th>
          <th>Friend</th>
        </tr>
      </thead>
      <tbody>
        {
          books.map((book, index) => (
            <tr key={index}>
              <td><a href={`/books/edit/${book.id}`}>{book.title}</a></td>
              <td>{book.author}</td>
              <td>{book.publish}</td>
              <td>{book.complete}</td>
              <td>{book.category.name}</td>
              <td>{book.friendId ? book.friend.name : ''}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </article>
};
