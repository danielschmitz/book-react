import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import service from "../service"
import ShowJson from "../ShowJson"

export default function CreateBook() {

  const [book, setBook] = useState({
    title: "",
    author: "",
    publish: new Date().toISOString().slice(0, 10),
    complete: 0,
    categoryId: 1,
    friendId: 0,
  })

  const [categories, setCategories] = useState([])
  const [friends, setFriends] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    service.categories.getAll().then(setCategories)
    service.friends.getAll().then(setFriends)
  }, [])

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (book.friendId === '0') { // fix frindId 0 as string
      book.friendId = 0
    }

    service.books.save(book).then(() => {
      navigate('/')
    })
  }

  return <form onSubmit={handleSubmit}>
    <article>
      <header>
        <strong>Create Book</strong>
      </header>

      <ShowJson>{book}</ShowJson>

      <div className="grid">

        <div>
          <label htmlFor="name">Title</label>
          <input type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Author</label>
          <input type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
          />
        </div>

      </div>

      <div className="grid">

        <div>
          <label htmlFor="name">Publish</label>
          <input type="date"
            id="publish"
            name="publish"
            value={book.publish}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">Complete ({book.complete}%)</label>
          <input type="range"
            id="complete"
            name="complete"
            value={book.complete}
            onChange={handleInputChange}
          />
        </div>

      </div>

      <div className="grid">

        <div>
          <label htmlFor="firendId">Friend</label>
          <select id="friendId" name="friendId"
            onChange={handleInputChange}
            value={book.friendId}>
            <option value={0}> Nobody </option>
            {friends.map(friend => (
              <option
                key={friend.id}
                value={friend.id}
              >{friend.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoryId">Category</label>
          <select id="categoryId" name="categoryId"
            onChange={handleInputChange}
            value={book.categoryId}>
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >{category.name}</option>
            ))}
          </select>
        </div>

      </div>

      <footer className="itensBetween">
        <a href="/">Back</a>
        <button type="submit">Save</button>
      </footer>
    </article>
  </form>
}