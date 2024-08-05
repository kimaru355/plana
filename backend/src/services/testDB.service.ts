import { PrismaClient } from "@prisma/client";

export const testDBConnection = async () => {
  try {
    const prisma: PrismaClient = new PrismaClient();
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database");
    console.error(error);
  }
};

export const checkErrors = async () => {
  try {
    const prisma: PrismaClient = new PrismaClient();
    const events = await prisma.event.findMany();
    if (events) {
      console.log("No errors found");
    }
  } catch (error) {
    console.error("Errors found");
    console.error(error);
  }
};
