import { useEffect, useState } from "react";

const API = "http://localhost:3001/contacts"

export default function Contacts(params) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setContacts(data))
  }, []);

  return <article>
    <header>
      <strong>Contacts</strong>
    </header>
    <ul>
      {contacts.map(contact => <li key={contact.id}>{contact.name}</li>)}
    </ul>
  </article>

};
