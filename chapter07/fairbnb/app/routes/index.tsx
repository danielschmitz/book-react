
import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { commitSession, getSession } from "~/sessions";

export async function loader({request}: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const message = session.get("message") as string ?? '';
  
  return json(
    message,
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export default function Index() {
  
  const [message, setMessage] = useState(useLoaderData<typeof loader>())

  setTimeout(() => {
    setMessage("");
  }, 3000);

  return (
    <div>
      {message && <div className="flash">{message}</div>}
      <h1>Welcome to fAirBnb</h1>
    </div>
  );
}
