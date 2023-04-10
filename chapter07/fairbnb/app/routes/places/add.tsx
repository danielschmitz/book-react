import { Role } from "@prisma/client";
import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { Form } from "~/form";
import { formAction } from "~/form-action.server";
import { getUser, verify } from "~/login";
import CityService from "~/services/city.server";
import PlaceService from "~/services/place.server";

export async function loader({ request }: LoaderArgs) {
  await verify(request, [Role.HOST]);
  const cities = await CityService.all();
  const user = await getUser(request);
  return {
    user,
    cities,
  };
}

const schema = z.object({
  name: z.string().min(3).max(50),
  address: z.string(),
  price: z.number(),
  cityId: z.number(),
  userId: z.number(),
});

const mutation = makeDomainFunction(schema)(
  async (values) => await PlaceService.create(values)
);

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: (place: any) =>
      `/places/${place.id}/edit` /* path to redirect on success */,
  });

export default function AddPlace() {
  const { user, cities } = useLoaderData<typeof loader>();

  const options = cities.map((city) => ({
    name: `${city.country.name} - ${city.name}`,
    value: city.id,
  }));

  return (
    <>
      <article>
        <header>
          <h4>Add Place</h4>
        </header>
        <Form
          schema={schema}
          values={{ userId: user.id }}
          hiddenFields={["userId"]}
        >
          {({ Field, Errors, Button }) => (
            <>
              <Field name="userId" />
              <div className="grid">
                <div>
                  <Field name="name" />
                </div>
                <div>
                  <Field name="price" />
                </div>
              </div>
              <div>
                <Field name="cityId" 
                  options={options} 
                  label="City" />
              </div>
              <div>
                <Field name="address" />
              </div>
              <Errors />
              <div style={{ display: "flex", 
                        justifyContent: "center" }}>
                <Button style={{ maxWidth: "100px" }} />
              </div>
            </>
          )}
        </Form>
      </article>
    </>
  );
}
