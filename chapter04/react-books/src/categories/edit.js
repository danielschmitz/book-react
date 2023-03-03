import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "../service"

export default function EditCategory() {

  const [category, setCategory] = useState({
    name: ""
  })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    service.categories.getById(id).then(setCategory)
  }, [id])

  const handleInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    service.categories.save(category).then(() => {
      navigate('/categories')
    })
  }

  return <form onSubmit={handleSubmit}>
    <article>
      <header>
        <strong>Edit Category</strong>
        <a 
          style={{
            float: "right",
          }}
          href={`/categories/remove/${category.id}`}>Remove</a>
      </header>

      <div>
        <label htmlFor="name">Name</label>
        <input type="text"
          id="name"
          name="name"
          value={category.name}
          onChange={handleInputChange}
        />
      </div>

      <footer className="itensBetween">
        <a href="/categories">Back</a>
        <button type="submit">Save</button>
      </footer>
    </article>
  </form>
};
