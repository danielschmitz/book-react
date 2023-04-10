import { Role } from "@prisma/client";
import { ActionArgs, redirect, type LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { verify } from "~/login";
import PhotoService from "~/services/photo.server";

export async function loader({ request, params }: LoaderArgs) {
  await verify(request, [Role.HOST]);
  const photoId: number = Number(params.id);

  const checkInteger = z.number().int().safeParse(photoId);
  if (checkInteger.success === false) {
    throw new Error("Invalid ID");
  }
  
  const photo = await PhotoService.get(photoId);
  
  if (photo == null) {
    throw new Error("Photo not found");
  }

  const photoImgBase64 = Buffer.from(photo.img).toString("base64");

  return {
    photo, photoImgBase64
  }

}

export async function action({ request, params }: ActionArgs) {
  const photoId: number = Number(params.id);
  const photo = await PhotoService.get(photoId);
  if (photo == null) {
    throw new Error("Photo not found");
  }
  const placeId = photo.placeId;
  await PhotoService.delete(photoId);

  return redirect(`/places/${placeId}/photos`);
};

export default function DeletePhoto() {
  
  const { photo, photoImgBase64 } = useLoaderData<typeof loader>();

  return (
    <article>
      <header>
        <strong>Delete Photo (place: {photo.place.name})</strong>
      </header>
      <div>
        <p>Are you sure you want to delete this photo?</p>
        <img src={`data:image;base64,${photoImgBase64}`} alt="Delete?"/> 
        <br />
        <br />
        <div className="center">
          <Form method="post">
            <button>Yes</button>
          </Form>
        </div>
      </div>
      <footer className="form_footer">
          <Link to={`/places/${photo.placeId}/photos`}>Back</Link>
        </footer>
    </article>
  )

};
