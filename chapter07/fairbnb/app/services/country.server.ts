
import { db } from "~/db";

const CountryService = {
  create: async (country: any) =>
    await db.country.create({
      data: {
        ...country
      },
    }),
  update: async (country: any) =>
    await db.country.update({
      where: {
        id: country.id
      },
      data: {
        ...country
      }
    }),
  all: async () => await db.country.findMany(),
  get: async (id: number) => await db.country.findUnique({
    where: {
      id
    }
  }),
  delete: async (id:number) => await db.country.delete({
    where: {id}
  }),

}

export default CountryService