
import { type ActionArgs, json, redirect, type LoaderArgs } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import CountryService from "~/services/country.server";

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="error">
      Sorry, there was an error loading this page.
      <br /><br />
      <code>{error.message}</code>
    </div>
  );
}

export async function loader({ params }: LoaderArgs) {

  const id: number = Number(params.id);

  const checkInteger = z.number().int().safeParse(id);
  if (checkInteger.success === false) {
    throw new Error("Invalid ID");
  }

  const country = await CountryService.get(id);

  if (!country) {
    throw new Error("Country not found");
  }

  return json(country)
};


export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const awnser = formData.get("awnser")
  const id = formData.get("id")

  console.log(id)

  if (awnser == "no") {
    return redirect('/admin/countries')
  }
  
  await CountryService.delete(Number(id))
  
  return redirect('/admin/countries');
};


export default function DeleteCountry() {
  const country = useLoaderData<typeof loader>();

  return <>
    <h5>Delete Country</h5>
    {country && <Form method="post">
      <input type="hidden" name="id" id="id" defaultValue={country.id} />
      <div>Delete {country.name} ?</div>
      <br/><br/>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button type="submit" name="awnser" value="yes" style={{width:'100px'}}>Yes</button>
        <button type="submit" name="awnser" value="no" className="secondary" style={{width:'100px'}}>No</button>
      </div>
    </Form>}
  </>
};

