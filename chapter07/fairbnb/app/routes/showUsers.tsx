import { Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db";
import { verify } from "~/login";

export async function loader({ request }: LoaderArgs) {
  await verify(request, [Role.ADMIN]);

  const users = db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return users;
}

export default function Index() {
  const users = useLoaderData<typeof loader>();
  return (
    <div>
      <strong>Users</strong>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
