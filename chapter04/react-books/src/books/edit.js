import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "../service"
import ShowJson from "../ShowJson"

export default function EditBook() {

  const [book, setBook] = useState({
    title: "",
    author: "",
    publish: "",
    complete: 0,
    categoryId: 0,
    friendId: 0,
  })

  const [categories, setCategories] = useState([])
  const [friends, setFriends] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    service.books.getById(id).then(setBook)
    service.categories.getAll().then(setCategories)
    service.friends.getAll().then(setFriends)
  }, [id])

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (book.friendId === '0') { // fix frindId 0 as string
      book.friendId = 0;
    }

    service.books.save(book).then(() => {
      navigate('/')
    })
  }

  return <form onSubmit={handleSubmit}>
    <article>
      <header>
        <strong>Edit Book</strong>
        <a
          style={{
            float: "right",
          }}
          href={`/books/remove/${book.id}`}>Remove</a>
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
          />
        </div>

        <div>
          <label htmlFor="name">Author</label>
          <input type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
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
          <label htmlFor="fruit">Friend</label>
          <select id="friendId" name="friendId" onChange={handleInputChange} value={book.friendId}>
            <option value={0}> Nobody </option>
            <Friends friends={friends}/>
          </select>
        </div>

        <div>
          <label htmlFor="fruit">Category</label>
          <select id="categoryId" name="categoryId" onChange={handleInputChange} value={book.categoryId}>
            <Categories categories={categories}/>
          </select>
        </div>

      </div>

      <footer className="itensBetween">
        <a href="/">Back</a>
        <button type="submit">Save</button>
      </footer>
    </article>
  </form>
};

function Friends({ friends }) {
  return friends.map(friend => (
    <option
      key={friend.id}
      value={friend.id}
    >{friend.name}</option>
  ))
}
function Categories({ categories }) {
  return categories.map(category => (
    <option
      key={category.id}
      value={category.id}
    >{category.name}</option>
  ))
}
