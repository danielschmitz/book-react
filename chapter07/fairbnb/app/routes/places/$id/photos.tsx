import { Role } from "@prisma/client";
import {
  type ActionArgs,
  json,
  type LoaderArgs,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { db } from "~/db";
import { verify } from "~/login";
import PhotoService from "~/services/photo.server";
import PlaceService from "~/services/place.server";

export async function loader({ request, params }: LoaderArgs) {
  await verify(request, [Role.HOST]);
  const id: number = Number(params.id);

  const checkInteger = z.number().int().safeParse(id);
  if (checkInteger.success === false) {
    throw new Error("Invalid ID");
  }

  const place = await PlaceService.get(id);

  if (place == null) {
    throw new Error("Place not found");
  }

  const photos = await PhotoService.all(place.id);

  const photosData = photos.map((photo) => {
    const data = Buffer.from(photo.img).toString("base64");
    return {
      id: photo.id,
      name: photo.name,
      img: data,
    };
  });
  return json({ place, photosData });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler({})
  );
  const img = formData.get("img") as File;
  const name = formData.get("name") as string;
  const placeId = Number(params.id);

  await PhotoService.create({
    img: await Buffer.from(await img.arrayBuffer()),
    name,
    placeId,
  });

  return {
    ok: true,
  };
}

export default function PhotosPlace() {
  const { place, photosData } = useLoaderData<typeof loader>();

  return (
    <>
      <article>
        <header>
          <strong>Add Photo to {place.name}</strong>
        </header>

        <Form method="post" encType="multipart/form-data">
          <div>
            <div>
              <label htmlFor="img"> Image: </label>
              <input id="img" type="file" name="img" accept="image/*" />
            </div>
            <div>
              <label htmlFor="name"> Description: </label>
              <input id="name" type="text" name="name" />
            </div>
          </div>
          <div className="center">
            <button style={{ maxWidth: "200px" }} type="submit">
              Upload
            </button>
          </div>
        </Form>

        <br />
        <br />
        <header>
          <strong>Saved Photos</strong>
        </header>

        <div>
          {photosData &&
            photosData.map((photo) => (
              <div key={photo.id} className="center" style={{ margin: "10px" }}>
                <img src={`data:image;base64,${photo.img}`} alt={photo.name} />                
                <Link to={`/photos/${photo.id}/delete`}>Delete?</Link>
              </div>              
            ))}
        </div>

        <footer className="form_footer">
          <Link to={`/`}>Home</Link>
        </footer>
      </article>
    </>
  );
}
