
import { db } from "~/db";

const PlaceService = {
  create: async (place: any) =>
    await db.place.create({
      data: {
        ...place
      },
    }),
  update: async (place: any) =>
    await db.place.update({
      where: {
        id: place.id
      },
      data: {
        ...place
      }
    }),
  all: async () => await db.place.findMany({
    
  }),
  allByUserId: async (userId: number) => await db.place.findMany({
    where: {
      userId
    }
  }),
  get: async (id: number) => await db.place.findUnique({
    where: {
      id
    }
  }),
  delete: async (id:number) => await db.place.delete({
    where: {id}
  }),

}

export default PlaceService