import {
  useLoaderData,
  Form,
  Link,
  useActionData,
  useTransition,
} from "@remix-run/react";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { db } from "~/db";
import { type User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { commitSession, getSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");

  if (error == "unauthorized") {
    return "Unauthorized access. You must be logged in to view this page.";
  }

  if (error == "unauthorized-privileges") {
    return "Unauthorized access. You dont have permissions to view this page. Try with another user";
  }

  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as User["email"];
  const password = formData.get("password") as User["password"];

  if (!email || !password) {
    return "Email and password are required";
  }

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return "Email not found";
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return "Invalid password";
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user.id.toString());
  session.set("role", user.role);
  session.flash("message", `Welcome ${user.name}`);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Login() {
  const errorLoader = useLoaderData();
  const errorAction = useActionData();

  const transition = useTransition();
  const busy: boolean = Boolean(transition.submission);

  return (
    <>
      <article>
        <Form method="post">
          <header>
            <strong>Login</strong>
            <Link className="right" to="/register">
              Register
            </Link>
          </header>

          <br />

          <div className="center" style={{ maxWidth: 500 }}>
            {errorLoader && <div className="error">{errorLoader}</div>}
            {errorAction && <div className="error">{errorAction}</div>}

            <label htmlFor="firstname">
              Email
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                defaultValue="user@user.com"
              />
            </label>

            <label htmlFor="lastname">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                defaultValue="123456"
              />
            </label>
          </div>

          <footer className="form_footer">
            <Link to="/">Back</Link>
            <button type="submit" disabled={busy}>
              {busy ? "Logging..." : "Login"}
            </button>
          </footer>
        </Form>
      </article>
    </>
  );
}
