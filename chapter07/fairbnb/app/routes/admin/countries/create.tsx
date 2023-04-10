import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { type ActionFunction } from "@remix-run/node";
import { formAction } from "~/form-action.server";
import { Form } from "~/form";
import CountryService from "~/services/country.server";

const schema = z.object({
  name: z.string().min(3).max(50),
});

const mutation = makeDomainFunction(schema)(async (values) =>
  await CountryService.create(values)
);

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: "/admin/countries" /* path to redirect on success */,
  });

export default function CreateCountry() {
  return (
    <>
      <h5>Create Country</h5>
      <Form schema={schema} />
    </>
  );
}
