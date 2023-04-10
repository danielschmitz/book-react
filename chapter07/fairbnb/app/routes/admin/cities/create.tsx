import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { type LoaderArgs, type ActionFunction } from "@remix-run/node";
import { formAction } from "~/form-action.server";
import { Form } from "~/form";
import CityService from "~/services/city.server";
import CountryService from "~/services/country.server";
import { useLoaderData } from "@remix-run/react";

const schema = z.object({
  name: z.string().min(3).max(50),
  countryId: z.number(),
});

const mutation = makeDomainFunction(schema)(
  async (values) => await CityService.create(values)
);

export async function loader({ request }: LoaderArgs) {
  const countries = await CountryService.all();
  return countries;
}

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: "/admin/cities" /* path to redirect on success */,
  });

export default function CreateCity() {
  const countries = useLoaderData<typeof loader>();
  const options = countries.map((country) => ({
    name: country.name,
    value: country.id,
  }));
  return (
    <>
      <h5>Create City</h5>
      <Form schema={schema}>
        {({ Field, Errors, Button }) => (
          <>
            <div className="grid">
              <div>
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
    </>
  );
}
