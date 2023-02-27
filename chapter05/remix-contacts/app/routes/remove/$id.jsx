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
    const { id } = formObject;
    await db('contacts').delete().where({ id });
    return redirect('/');
};


export default function EditContact(params) {
    const contact = useLoaderData();

    return <article>
        <header>
            <strong>Delete Contact ?</strong>
        </header>
        <Form method="post">
            <input type="hidden" name="id" defaultValue={contact.id} />


            Delete {contact.name} ?

            <br /><br /><br />

            <div className="form_footer">
                <Link role="button" to="/">No</Link>
                <input type="submit" value="Yes" />
            </div>
        </Form>
    </article>
};
