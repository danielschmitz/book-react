
import { db } from "~/db";

const PhotoService = {
  create: async (photo: any) =>
    await db.photo.create({
      data: {
        ...photo
      },
    }),
  all: async (placeId:number) => await db.photo.findMany({
    include: { 
      place: true
    },
    where: {
      placeId
    }
  }),
  get: async (id: number) => await db.photo.findUnique({
    include: { 
      place: true
    },
    where: {
      id
    }
  }),
  delete: async (id:number) => await db.photo.delete({
    where: {id}
  }),

}

export default PhotoService