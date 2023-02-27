import { redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import db from '../db'

export const action = async ({ request }) => {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);

  if (!formObject.name) {
    return "Name is required";
  } 

  if (!formObject.email) {
    return "Email is required";
  } 

  const checkName = await db("contacts").where({ name: formObject.name }).first();
  if (checkName) {
    return "Name is already in use";
  }

  const checkEmail = await db("contacts").where({ email: formObject.email }).first();
  if (checkEmail) {
    return "Email is already in use";
  }

  await db('contacts').insert(formObject);
  return redirect('/');
}

export default function Create() {

  const error = useActionData();

  return <article>
    <header>
      <strong>Create Contact</strong>
    </header>
    { error && <div className="error">{error}</div> }
    <Form method="post">
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Email:
        <input type="text" name="email" />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" />
      </label>
      <div className="form_footer">
        <Link to="/">Cancel</Link>
        <input type="submit" value="Create" />
      </div>
    </Form>
  </article>;
};
