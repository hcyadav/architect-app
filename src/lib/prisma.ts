// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

import { PrismaClient } from "../generated/client_v7";

const globalForPrisma = globalThis as unknown as {
  prismaV7: PrismaClient | undefined;
};

const prisma = globalForPrisma.prismaV7 ?? new PrismaClient();
export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaV7 = prisma;
}
