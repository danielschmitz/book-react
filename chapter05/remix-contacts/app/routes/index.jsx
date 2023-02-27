import { Link, useLoaderData } from "@remix-run/react";
import db from "../db";

export const loader = async () => {
  const contacts = await db("contacts").select("*");
  return contacts
}

function table(contacts) {
  if (!Array.isArray(contacts)){
    return "contacts is not an array"
  } 
  if (contacts.length === 0) {
    return "no contacts..."
  }
  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => (
          <tr key={contact.id}>
            <th>
              <Link to={`/edit/${contact.id}`}>
                {contact.name}</Link>
            </th>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default function Index() {
  const contacts = useLoaderData();
  return (
    <div>
      {table(contacts)}
    </div>
  );
}
