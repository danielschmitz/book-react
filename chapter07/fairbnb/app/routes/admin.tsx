import { Link, NavLink, Outlet } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { Role } from "@prisma/client";
import { verify } from "~/login";

export async function loader({ request }: LoaderArgs) {
  await verify(request, [Role.ADMIN]);
  return {};
}

export default function Index() {
  return (
    <>
      <article>
        <header>
          <h3>Admin</h3>
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/countries">Countries</NavLink>
              </li>
              <li>
                <NavLink to="/admin/cities">Cities</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
        <footer className="form_footer">
          <Link to="/">Back</Link>
        </footer>
      </article>
    </>
  );
}
