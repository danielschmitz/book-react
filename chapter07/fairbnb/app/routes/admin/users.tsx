import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node"
import { db } from "~/db";

export async function loader({request}: LoaderArgs) {
  return json(await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  }))
};

export default function AdminUsers() {
  const users = useLoaderData<typeof loader>();
  return (
    <div>
      <h5>Users</h5>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/admin/users/${user.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
