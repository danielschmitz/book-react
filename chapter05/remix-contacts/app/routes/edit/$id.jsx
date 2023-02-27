import db from "../../db";
import { useLoaderData, useActionData, Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export const loader = async ({ params }) => {
    const { id } = params;
    return await db("contacts").where({ id }).first();
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData);
    
    if (!formObject.name) {
        return "Name is required";
      } 
    
      if (!formObject.email) {
        return "Email is required";
      } 
    
      const checkName = await db("contacts")
                                .where({ name: formObject.name })
                                .whereNot({ id: formObject.id })
                                .first();
      if (checkName) {
        return "Name is already in use";
      }
    
      const checkEmail = await db("contacts")
                                .where({ email: formObject.email })
                                .whereNot({ id: formObject.id })
                                .first();
      if (checkEmail) {
        return "Email is already in use";
      }
      
      const {name, email, phone} = formObject;
      await db('contacts')
                .update({name, email, phone})
                .where({ id: formObject.id });
      return redirect('/');
};


export default function EditContact(params) {
    const contact = useLoaderData();
    const error = useActionData();
    
    return <article>
        <header>
            <strong>Edit Contact</strong>
            <Link style={{float:'right'}} to={`/remove/${contact.id}`}>Delete</Link>
        </header>
        { error && <div className="error">{error}</div> }
        <Form method="post">
        <input type="hidden" name="id" defaultValue={contact.id} />
      <label>
        Name:
        <input type="text" name="name" defaultValue={contact.name} />
      </label>
      <label>
        Email:
        <input type="text" name="email" defaultValue={contact.email} />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" defaultValue={contact.phone}/>
      </label>
      <div className="form_footer">
        <Link to="/">Cancel</Link>
        <input type="submit" value="Save" />
      </div>
    </Form>
    </article>
};
