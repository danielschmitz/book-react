import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const hash = bcrypt.hashSync("123456", 10);

async function main() {
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@admin.com",
      password: hash,
      role: Role.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      name: "user",
      email: "user@user.com",
      password: hash,
      role: Role.USER,
    },
  });

  await prisma.user.create({
    data: {
      name: "host",
      email: "host@host.com",
      password: hash,
      role: Role.HOST,
    },
  });

  // Countries
  await prisma.country.createMany({
    data: [
      { name: "China" },
      { name: "India" },
      { name: "United States" },
      { name: "Indonesia" },
      { name: "Pakistan" },
      { name: "Brazil" },
      { name: "Nigeria" },
      { name: "Bangladesh" },
      { name: "Russia" },
      { name: "Mexico" },
    ],
  })

  // Cities
  await prisma.city.createMany({
    data: [
      // China
      { name: "Shanghai", countryId: 1 },
      { name: "Beijing", countryId: 1 },
      { name: "Guangzhou", countryId: 1 },
      { name: "Shenzhen", countryId: 1 },
      { name: "Chongqing", countryId: 1 },

      // India
      { name: "Mumbai", countryId: 2 },
      { name: "Delhi", countryId: 2 },
      { name: "Bengaluru", countryId: 2 },
      { name: "Hyderabad", countryId: 2 },
      { name: "Chennai", countryId: 2 },

      // United States
      { name: "New York City", countryId: 3 },
      { name: "Los Angeles", countryId: 3 },
      { name: "Chicago", countryId: 3 },
      { name: "Houston", countryId: 3 },
      { name: "Phoenix", countryId: 3 },

      // Indonesia
      { name: "Jakarta", countryId: 4 },
      { name: "Surabaya", countryId: 4 },
      { name: "Bandung", countryId: 4 },
      { name: "Medan", countryId: 4 },
      { name: "Semarang", countryId: 4 },

      // Pakistan
      { name: "Karachi", countryId: 5 },
      { name: "Lahore", countryId: 5 },
      { name: "Faisalabad", countryId: 5 },
      { name: "Rawalpindi", countryId: 5 },
      { name: "Multan", countryId: 5 },

      // Brazil
      { name: "São Paulo", countryId: 6 },
      { name: "Rio de Janeiro", countryId: 6 },
      { name: "Brasília", countryId: 6 },
      { name: "Salvador", countryId: 6 },
      { name: "Fortaleza", countryId: 6 },

      // Nigeria
      { name: "Lagos", countryId: 7 },
      { name: "Kano", countryId: 7 },
      { name: "Ibadan", countryId: 7 },
      { name: "Abuja", countryId: 7 },
      { name: "Benin City", countryId: 7 },

      // Bangladesh
      { name: "Dhaka", countryId: 8 },
      { name: "Chittagong", countryId: 8 },
      { name: "Khulna", countryId: 8 },
      { name: "Rajshahi", countryId: 8 },
      { name: "Sylhet", countryId: 8 },

      // Russia
      { name: "Moscow", countryId: 9 },
      { name: "Saint Petersburg", countryId: 9 },
      { name: "Novosibirsk", countryId: 9 },
      { name: "Yekaterinburg", countryId: 9 },
      { name: "Nizhny Novgorod", countryId: 9 },

      // Mexico
      { name: "Mexico City", countryId: 10 },
      { name: "Guadalajara", countryId: 10 },
      { name: "Ecatepec de Morelos", countryId: 10 },
      { name: "Puebla", countryId: 10 },
      { name: "Ciudad Juárez", countryId: 10 },
    ]
  });

  const Users = await prisma.user.count()
  const Countries = await prisma.country.count()
  const Cities = await prisma.city.count()

  console.log("Seed done. Count: ", {
    Users,Countries,Cities
  })


}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
