import Contacts from "./Contacts";
import Counter from "./Counter";
import Form from "./Form";
import HelloWorld from "./HelloWorld"
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";


function App() {

  useEffect(() => {
    if (localStorage.getItem('theme') !== null) {
      setTheme(localStorage.getItem('theme'))
    }
  },[])

  const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme);
  }

  return (
    <main className="container" >

      <nav>
        <ul>
          <li><Link to="/">Hello World</Link></li>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/form">Form</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>
      </nav>

      <div>
        <Routes>
          <Route exact path="/" element={<HelloWorld />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/form" element={<Form />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>

      <nav>
        <ul>
          <li><a href="#" onClick={()=>{setTheme('dark')}}>Dark</a></li>
          <li><a href="#" onClick={()=>{setTheme('light')}}>Light</a></li>
        </ul>
      </nav>

    </main>
  );
}

export default App;
