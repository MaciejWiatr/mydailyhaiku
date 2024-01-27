import { PrismaClient } from "@prisma/client";

const createPrisma = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? undefined : ["query", "info"],
  });

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = createPrisma();
} else {
  if (!global.prisma) {
    global.prisma = createPrisma();
  }
  prisma = global.prisma;
}

declare global {
  var prisma: PrismaClient;
}

export { prisma };
