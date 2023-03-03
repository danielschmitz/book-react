import { useState } from "react"
import { useNavigate } from "react-router-dom"
import service from "../service"

export default function CreateCategory() {

  const [category, setCategory] = useState({
    name: ""
  })
  
  const navigate = useNavigate()

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
        <strong>Create Category</strong>
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
