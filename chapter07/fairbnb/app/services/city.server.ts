
import { db } from "~/db";

const CityService = {
  create: async (city: any) =>
    await db.city.create({
      data: {
        ...city
      },
    }),
  update: async (city: any) =>
    await db.city.update({
      where: {
        id: city.id
      },
      data: {
        ...city
      }
    }),
  all: async () => await db.city.findMany({
    include: { 
      country: true
    }
  }),
  get: async (id: number) => await db.city.findUnique({
    where: {
      id
    }
  }),
  delete: async (id:number) => await db.city.delete({
    where: {id}
  }),

}

export default CityService