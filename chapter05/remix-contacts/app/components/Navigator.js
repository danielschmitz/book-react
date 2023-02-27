import { Link } from "@remix-run/react";

export default function Navigator() {
  return <div className="container">
    <nav>
      <ul>
        <li><h1>Contacts</h1></li>
      </ul>
      <ul>
        <li><Link role="button" to='/create'>New</Link></li>
      </ul>
    </nav>
  </div>
};
