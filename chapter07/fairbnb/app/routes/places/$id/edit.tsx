import { Role, Place } from "@prisma/client";
import type { ActionArgs, LoaderArgs,ActionFunction} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { Form } from "~/form";
import { formAction } from "~/form-action.server";
import { getUser, verify } from "~/login";
import CityService from "~/services/city.server";
import PlaceService from "~/services/place.server";

export async function loader({ request, params }: LoaderArgs) {
  await verify(request, [Role.HOST]);
  const id: number = Number(params.id);
  const url = new URL(request.url)
  const saved = url.searchParams.get('saved')
  
  const checkInteger = z.number().int().safeParse(id);
  if (checkInteger.success === false) {
    throw new Error("Invalid ID");
  }

  const place = await PlaceService.get(id);

  if (place == null) {
    throw new Error("Place not found");
  }

  const cities = await CityService.all();
  const user = await getUser(request);
  return {
    user,
    cities,
    place,
    saved
  };
}

const schema = z.object({
  name: z.string().min(3).max(50),
  address: z.string(),
  price: z.number(),
  cityId: z.number(),
  userId: z.number(),
  id: z.number(),
});

const mutation = makeDomainFunction(schema)(
  async (values) => await PlaceService.update(values)
);

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: (place: any) =>
      `/places/${place.id}/edit?saved=1` /* path to redirect on success */,
  });

export default function EditPlace() {
  const { saved, cities, place } = useLoaderData<typeof loader>();

  const options = cities.map((city) => ({
    name: `${city.country.name} - ${city.name}`,
    value: city.id,
  }));

  return (
    <>
      <article>
        <header>
          <h4>Edit Place</h4>
        </header>
        { saved && <div className="flash">Place Saved</div>}
        <Form 
          schema={schema} 
          values={place} 
          hiddenFields={['userId','id']}
          >
          {({ Field, Errors, Button }) => (
            <>
              
              <Field name="id"/>
              <Field name="userId"/>
              <div className="grid">
                <div>
                  <Field name="name" />
                </div>
                <div>
                  <Field name="price" />
                </div>
              </div>
              <div>
                <Field name="cityId" options={options} label="City" />
              </div>
              <div>
                <Field name="address" />
              </div>
              <Errors />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{ maxWidth: "100px" }} />
              </div>
            </>
          )}
        </Form>
        <footer className="form_footer">
          <Link to={`/places/${place.id}/photos`}>Photos</Link>
          <Link to={`/places/${place.id}/bookings`}>Bookings</Link>
          <Link to={`/places/${place.id}/reviews`}>Reviews</Link>
          <Link to={`/places/${place.id}/disable`}>Disable</Link>
        </footer>
      </article>
    </>
  );
}
