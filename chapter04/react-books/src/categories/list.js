import { useEffect, useState } from "react"
import service from "../service"

export default function ListCategories(params) {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    service.categories.getAll().then(setCategories)
  }, [])

  return <article>
    <header>
      <strong>Categories</strong>
    </header>
    <ul>
      {
        categories.map((category, index) => (
          <li key={index}>
            <a href={`/categories/edit/${category.id}`}>{category.name}</a>
          </li>
        ))
      }
    </ul>
    <footer className="itensBetween">
      <a href="/">Back</a>
      <a href="/categories/create">New Category</a>
    </footer>
  </article>
};
