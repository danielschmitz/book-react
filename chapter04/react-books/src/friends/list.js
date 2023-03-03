import { useEffect, useState } from "react"
import service from "../service"

export default function ListFriends(params) {

  const [friends, setFriends] = useState([])

  useEffect(() => {
    service.friends.getAll().then(setFriends)
  }, [])

  return <article>
    <header>
      <strong>Friends</strong>
    </header>
    <ul>
      {
        friends.map((friend, index) => (
          <li key={index}>
            <a href={`/friends/edit/${friend.id}`}>{friend.name}</a>
          </li>
        ))
      }
    </ul>
    <footer>
      <a href="/">Back</a>
    </footer>
  </article>
};
