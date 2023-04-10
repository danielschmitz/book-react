import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import CountryService from "~/services/country.server";

export async function loader({ request }: LoaderArgs) {
  return json(await CountryService.all());
}

export default function AdminCountries() {
  const countries = useLoaderData<typeof loader>();
  return (
    <>
      <h5>Countries</h5>
      <Link to="/admin/countries/create">New Country</Link> <br />
      <br />
      <table role="grid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <td>{country.name}</td>
              <td>
                <Link to={`/admin/countries/${country.id}/edit`}>Edit</Link>
                &nbsp;&nbsp;
                <Link to={`/admin/countries/${country.id}/delete`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
