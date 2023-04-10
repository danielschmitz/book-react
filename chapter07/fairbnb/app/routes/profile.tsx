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
import bcrypt from "bcryptjs";
import PlaceService from "~/services/place.server";


export async function loader({ request }: LoaderArgs) {
  await verify(request, [Role.USER, Role.HOST, Role.ADMIN]);
  const user: User = await getUser(request);
  const places = await PlaceService.allByUserId(user.id)
  return {user,places};
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === 'update') {
    return await update(request, formData);
  }

  if (action === 'changePassword') {
    return await changePassword(request, formData);
  }

  return "No action selected";
}

async function update(request: Request, formData: FormData) {
  const user: User = await getUser(request);

  const email = formData.get("email") as User["email"];
  const name = formData.get("name") as User["name"];
  const id = Number(await formData.get("id"));

  if (!id) {
    throw new Error("id is required");
  }

  if (id !== user.id) {
    throw new Error("You cannot change the data of another account");
  }

  const checkEmail = await db.user.findFirst({
    where: { email, NOT: { id } },
  });

  if (checkEmail) {
    return "Email is registred to another user";
  }

  await db.user.update({
    where: { id },
    data: { name, email },
  });

  const session = await getSession(request.headers.get("Cookie"));
  session.flash("message", "Profile updated");
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

async function changePassword(request: Request, formData: FormData) {
  
  const id = Number(await formData.get("id"));
  const password = formData.get("password") as User["password"];
  const newPassword = formData.get("newPassword") as User["password"];
  const confirmPassword = formData.get("confirmPassword") as User["password"];

  if (newPassword !== confirmPassword) {
    return "Confirmation Password do not match";
  }

  const userData = await db.user.findFirst({
    where: { id }, select: { password: true },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  if (!bcrypt.compareSync(password, userData.password)) {
    return "Password is incorrect";
  }

  const hash = bcrypt.hashSync(newPassword, 10);

  await db.user.update({
    where: { id },
    data: { password: hash },
  }) 

  const session = await getSession(request.headers.get("Cookie"));
  session.flash("message", "Password updated");
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}


export default function Profile() {
  const error = useActionData();
  const {user, places} = useLoaderData<typeof loader>();

  const transiction = useTransition();
  const busy = Boolean(transiction.submission);

  return (
    <Form method="post">
      {error && <div className="error">{error}</div>}
      <article>
        <header>
          <strong>Places</strong>
          </header>
          <ul>
            {places && places.map((place) => (
              <li key={place.id}>
                <Link to={`/places/${place.id}/edit`}>{place.name}</Link>
              </li>
            ))}
          </ul>
            <footer>
              <Link to="/places/add">New Place</Link>
            </footer>
      </article>
      <article>
        <header>
          <h2>Your Profile</h2>
        </header>

        <div style={{ maxWidth: 400, margin: "auto" }}>

          <input type="hidden" name="id" id="id" defaultValue={user.id} />

          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              defaultValue={user.name}
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
              defaultValue={user.email}
            />
          </label>
        </div>

        <footer className="form_footer">
          <Link to="/">Back</Link>
          <button 
            name="action"
            value="update"
            type="submit" 
            disabled={busy}>
            {busy ? "Wait..." : "Update"}
          </button>
        </footer>
      </article>
      <article>
        <header>
          <h2>Change Password</h2>
        </header>

        <div style={{ maxWidth: 400, margin: "auto" }}>

          <label htmlFor="name">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your current password"
            />
          </label>

          <label htmlFor="name">
            New Password
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="New Passowrd"
            />
          </label>

          <label htmlFor="name">
            Confirm New Password
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new Passowrd"
            />
          </label>
        </div>

        <footer className="form_footer">
          <Link to="/">Back</Link>
          <button 
            name="action"
            value="changePassword"
            type="submit" 
            disabled={busy}>
            {busy ? "Wait..." : "Change"}
          </button>
        </footer>
      </article>
    </Form>
  );
}
