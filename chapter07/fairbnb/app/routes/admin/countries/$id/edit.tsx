
import { type ActionFunction, json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { Form } from "~/form";
import { formAction } from "~/form-action.server";
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
});

const mutation = makeDomainFunction(schema)(async (values) =>
  await CountryService.update(values)
);

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: "/admin/countries" /* path to redirect on success */,
  });

export async function loader({ params }: LoaderArgs) {

  const id: number = Number(params.id);

  // if (!id) {
  //   throw new Error("Invalid ID");
  // }

  // if (Number.isInteger(id) === false) {
  //   throw new Error("ID is not integer");
  // }

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


export default function EditCountry() {
  const country = useLoaderData<typeof loader>();

  return <>
    <h5>Create Country</h5>
    {country &&
      <Form schema={schema} values={country} hiddenFields={['id']}>

        {({ Field, Errors, Button }) => (
          <>
            <Field name="id" />
            <Field name="name" />
            <Errors />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ maxWidth: '100px' }} />
            </div>
          </>
        )}

      </Form>
    }
  </>
};

