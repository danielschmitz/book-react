import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "../service"

export default function RemoveCategory() {

  const [category, setCategory] = useState({
    name: ""
  })

  const [error, setError] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    service.categories.getById(id).then(setCategory)
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    service.books.getByCategoryId(category.id).then(books => {
      if (books.length === 0) {
        service.categories.remove(category.id).then(() => {
          navigate('/categories')
        })
      } else {
        setError("This category has books, please remove them first")
      }
    })
  }

  return <form onSubmit={handleSubmit}>
    <article>
      <header>
        <strong>Remove Category</strong>
      </header>
      {error && <div className="error">{error}</div>}
      <div>
        Remove {category.name}?
      </div>

      <footer className="itensBetween">
        <a href="/categories">Back</a>
        <button type="submit">Yes</button>
      </footer>
    </article>
  </form>
};
