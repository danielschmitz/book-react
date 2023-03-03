import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "../service"

export default function RemoveBook() {

  const [book, setBook] = useState({
    name: ""
  })

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    service.books.getById(id).then(setBook)
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    service.books.remove(book.id).then(() => {
      navigate('/')
    })
  }

  return <form onSubmit={handleSubmit}>
    <article>
      <header>
        <strong>Remove Book</strong>
      </header>

      <div>
        Remove {book.title}?
      </div>

      <footer className="itensBetween">
        <a href="/">Back</a>
        <button type="submit">Yes</button>
      </footer>
    </article>
  </form>
};
