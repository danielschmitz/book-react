import { useState } from "react"
import { useNavigate } from "react-router-dom"
import service from "../service"

export default function CreateFriend() {

  const [friend, setFriend] = useState({
    name: "", email: ""
  })
  
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFriend({ ...friend, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    service.friends.save(friend).then(() => {
      navigate('/friends')
    })
  }

  return <form onSubmit={handleSubmit}>
    <article>
      <header>
        <strong>Create Friend</strong>
      </header>

      <div>
        <label htmlFor="name">Name</label>
        <input type="text"
          id="name"
          name="name"
          value={friend.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="text"
          id="email"
          name="email"
          value={friend.email}
          onChange={handleInputChange}
        />
      </div>

      <footer className="itensBetween">
        <a href="/friends">Back</a>
        <button type="submit">Save</button>
      </footer>
    </article>
  </form>
};
