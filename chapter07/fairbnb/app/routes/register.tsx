import { type Role, type User } from "@prisma/client";
import { type LoaderArgs, redirect, type ActionArgs } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";
import bcrypt from "bcryptjs";
import { db } from "~/db";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/");
  }

  return {};
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as User["email"];
  const password = formData.get("password") as User["password"];
  const name = formData.get("name") as User["name"];
  const role = Role.USER;
  const hash = bcrypt.hashSync(password, 10);

  if (password.length < 4) {
    return "Password must be greater than 4";
  }

  const checkEmail = await db.user.findFirst({
    where: { email: email },
  });

  if (checkEmail) {
    return "Email is registred";
  }

  const user = await db.user.create({
    data: {
      email,
      password: hash,
      name,
      role,
    },
  });

  const session = await getSession(request.headers.get("Cookie"));

  session.set("userId", user.id.toString());
  session.set("role", user.role);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Register() {
  const error = useActionData();

  const transiction = useTransition();
  const busy = Boolean(transiction.submission);

  return (
    <Form method="post">
      <article>
        <header>
          <h2>Register</h2>
        </header>

        <div style={{ maxWidth: 400, margin: "auto" }}>
          {error && <div className="error">{error}</div>}

          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
            />
          </label>

          <label htmlFor="name">
            Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </label>
        </div>

        <footer className="form_footer">
          <Link to="/">Back</Link>
          <button type="submit" disabled={busy}>
            {busy ? "Wait..." : "Register"}
          </button>
        </footer>
      </article>
    </Form>
  );
}
