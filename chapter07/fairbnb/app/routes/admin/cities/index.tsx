import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import CityService from "~/services/city.server";

export async function loader({ request }: LoaderArgs) {
  return json(await CityService.all());
}

export default function AdminCities() {
  const cities = useLoaderData<typeof loader>();
  return (
    <>
      <h5>Cities</h5>
      <Link to="/admin/cities/create">New City</Link> <br />
      <br />
      <table role="grid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>{city.country.name}</td>
              <td>
                <Link to={`/admin/cities/${city.id}/edit`}>Edit</Link>
                &nbsp;&nbsp;
                <Link to={`/admin/cities/${city.id}/delete`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
