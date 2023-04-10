import { Role } from "@prisma/client";
import { Link, useRouteLoaderData, useMatches, NavLink } from "@remix-run/react";

export default function Header() {
  const title = "fAirBnb";

  const matches = useMatches();

  const isLoginRoute = matches.find((match) => match.pathname === "/login");
  const isRegisterRoute = matches.find(
    (match) => match.pathname === "/register"
  );

  const { userId, role } = useRouteLoaderData("root") as {
    userId: string;
    role: string;
  };

  if (userId === "" || userId === undefined) {
    // not logged
    return (
      <nav>
        <ul>
          <li>
            <h1>{title}</h1>
          </li>
        </ul>
        <ul>
          {!isRegisterRoute && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {!isLoginRoute && (
            <li>
              <Link to="/login" role="button">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }

  if (role === Role.ADMIN) {
    return (
      <nav>
        <ul>
          <li>
            <h1>{title}</h1>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/showUsers">Users</NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
            >
              Admin
            </NavLink>
          </li>
          <li>
            <Link to="/logout" role="button">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  if (role === Role.USER) {
    return (
      <nav>
        <ul>
          <li>
            <h1>{title}</h1>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/logout" role="button">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  if (role === Role.HOST) {
    return (
      <nav>
        <ul>
          <li>
            <h1>{title}</h1>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/places/add">Add Place</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/logout" role="button">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return <div></div>;
}
