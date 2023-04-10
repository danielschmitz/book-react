
import { type ActionFunction, json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { Form } from "~/form";
import { formAction } from "~/form-action.server";
import CityService from "~/services/city.server";
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

const schema = z.object({
  id: z.number(),
  name: z.string().min(3).max(50),
  countryId: z.number(),
});

const mutation = makeDomainFunction(schema)(async (values) =>
  await CityService.update(values)
);

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: "/admin/cities" /* path to redirect on success */,
  });

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

  const countries = await CountryService.all();

  return json({city, countries})
};


export default function EditCity() {
  const {city, countries} = useLoaderData<typeof loader>();
  const options = countries.map((country) => ({
    name: country.name,
    value: country.id,
  }));

  return <>
    <h5>Create City</h5>
    {city &&
      <Form schema={schema} values={city} hiddenFields={['id']}>
      {({ Field, Errors, Button }) => (
        <>
          <div className="grid">
            <div>
              <Field name="id"/>
              <Field name="name"/>
            </div>
            <div>
              <Field name="countryId" options={options} label="Country" />
            </div>
          </div>
          <Errors />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button style={{ maxWidth: "100px" }} />
          </div>
        </>
      )}
    </Form>
    }
  </>
};

