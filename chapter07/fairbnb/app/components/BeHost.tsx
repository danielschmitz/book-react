import { Role } from "@prisma/client";
import { Link, useRouteLoaderData } from "@remix-run/react";

export default function BeHost() {
  const { role } = useRouteLoaderData("root") as {
    
    role: string;
  };
  if (role === Role.USER) {
    return <div style={{textAlign: 'center'}}>
      <Link to="/be-a-host">Be a Host!</Link>
    </div>;
  }
  return <></>
};
