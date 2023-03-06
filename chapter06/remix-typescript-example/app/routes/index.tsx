import type { LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";


export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name")
  const email = url.searchParams.get("email")
  
  return {
    name, email
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data.name)
  return (
    <div>
        Your name: {data.name} <br />
        Your name: {data.email} <br />
    </div>
  );
}
