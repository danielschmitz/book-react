import '@picocss/pico'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ListBooks from './books/list'
import ListCategories from './categories/list'
import EditCategory from './categories/edit'
import EditFriend from './friends/edit'
import ListFriends from './friends/list'
import CreateCategory from './categories/create'
import CreateBook from './books/create'
import RemoveBook from './books/remove'
import RemoveCategory from './categories/remove'
import CreateFriend from './friends/create'
import RemoveFriend from './friends/remove'
import EditBook from './books/edit'

export default function App() {

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [])

  const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div className='container'>
      <nav>
        <ul>
          <li><strong>My Books</strong></li>
        </ul>
        <ul>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/friends">Friends</a></li>
          <li><a href="/books/create" role="button">New Book</a></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route exact path="/" element={<ListBooks />} />
          <Route exact path="/books/create" element={<CreateBook />} />
          <Route exact path="/books/edit/:id" element={<EditBook />} />
          <Route exact path="/books/remove/:id" element={<RemoveBook />} />
          <Route exact path="/categories" element={<ListCategories />} />
          <Route exact path="/categories/edit/:id" element={<EditCategory />} />
          <Route exact path="/categories/create" element={<CreateCategory />} />
          <Route exact path="/categories/remove/:id" element={<RemoveCategory />} />
          <Route exact path="/friends" element={<ListFriends />} />
          <Route exact path="/friends/edit/:id" element={<EditFriend />} />
          <Route exact path="/friends/create" element={<CreateFriend />} />
          <Route exact path="/friends/remove/:id" element={<RemoveFriend />} />
        </Routes>
      </main>

      <div style={{ textAlign: 'center' }}>
        <a href="#" onClick={() => { setTheme('dark') }}>Dark</a>
        &nbsp;&nbsp;
        <a href="#" onClick={() => { setTheme('light') }}>Light</a>
      </div>

    </div>
  )
}

