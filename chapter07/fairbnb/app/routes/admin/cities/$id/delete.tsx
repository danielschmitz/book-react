
import { type ActionArgs, json, redirect, type LoaderArgs } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import CityService from "~/services/city.server";

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

  const city = await CityService.get(id);

  if (!city) {
    throw new Error("City not found");
  }

  return json(city)
};


export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const awnser = formData.get("awnser")
  const id = formData.get("id")

  console.log(id)

  if (awnser == "no") {
    return redirect('/admin/cities')
  }
  
  await CityService.delete(Number(id))
  
  return redirect('/admin/cities');
};


export default function DeleteCity() {
  const city = useLoaderData<typeof loader>();

  return <>
    <h5>Delete City</h5>
    {city && <Form method="post">
      <input type="hidden" name="id" id="id" defaultValue={city.id} />
      <div>Delete {city.name} ?</div>
      <br/><br/>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button type="submit" name="awnser" value="yes" style={{width:'100px'}}>Yes</button>
        <button type="submit" name="awnser" value="no" className="secondary" style={{width:'100px'}}>No</button>
      </div>
    </Form>}
  </>
};

