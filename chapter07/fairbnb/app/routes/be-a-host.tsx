import { Role, type User } from "@prisma/client";
import { type LoaderArgs, type ActionArgs, redirect } from "@remix-run/node";
import { db } from "~/db";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { getUser, verify } from "~/login";
import { commitSession, getSession } from "~/sessions";


export async function loader({ request }: LoaderArgs) {
  await verify(request, [Role.USER, Role.HOST, Role.ADMIN]);
  const user: User = await getUser(request);
  return user;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = Number(await formData.get("id"));
  const isHost = await formData.get("switch");
  
  await db.user.update({
    where: { id },
    data: { role: isHost ? Role.HOST : Role.USER },
  }) 

  const session = await getSession(request.headers.get("Cookie"));
  session.set("role", isHost ? Role.HOST : Role.USER )
  session.flash("message", isHost ? "You are a Host now" : "You aren't a Host");
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function BeAHost() {
  const error = useActionData();
  const user = useLoaderData<typeof loader>();
  const isHost = user.role === Role.HOST;

  const transiction = useTransition();
  const busy = Boolean(transiction.submission);

  return (
    <Form method="post">
      <input type="hidden" name="id" id="id" defaultValue={user.id} />

      {error && <div className="error">{error}</div>}
      
      <article>
        <header>
          <h2>Be a Host!</h2>
        </header>

        <div style={{ maxWidth: 400, margin: "auto" }}>
          <input type="hidden" name="id" id="id" defaultValue={user.id} />

            You can host your places for other people and earn money!
            <br/><br/>
            <label htmlFor="switch">
              <input
                type="checkbox"
                id="switch"
                name="switch"
                role="switch"
                defaultChecked={isHost}
              />
              I'm a host
            </label>
        </div>

        <footer className="form_footer">
          <Link to="/">Back</Link>
          <button type="submit" disabled={busy}>
            {busy ? "Wait..." : "Save"}
          </button>
        </footer>
      </article>
    </Form>
  );
}
<br/>