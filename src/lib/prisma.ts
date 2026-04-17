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

import { PrismaClient } from "../generated/client_final";

const globalForPrisma = globalThis as unknown as {
  prismaFinal: PrismaClient | undefined;
};

const prisma = globalForPrisma.prismaFinal ?? new PrismaClient();
export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaFinal = prisma;
}
