import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "../service"

export default function RemoveFriend() {

  const [friend, setFriend] = useState({
    name: ""
  })

  const [error, setError] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    service.friends.getById(id).then(setFriend)
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    service.books.getByFriendId(friend.id).then(books => {
      if (books.length === 0) {
        service.friends.remove(friend.id).then(() => {
          navigate('/friends')
        })
      } else {
        setError("This friend has borrowed books")
      }
    })
  }

  return <form onSubmit={handleSubmit}>
    <article>
      <header>
        <strong>Remove Friend</strong>
      </header>
      {error && <div className="error">{error}</div>}
      <div>
        Remove {friend.name}?
      </div>

      <footer className="itensBetween">
        <a href="/friends">Back</a>
        <button type="submit">Yes</button>
      </footer>
    </article>
  </form>
};
