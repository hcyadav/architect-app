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

import { PrismaClient } from "../generated/client_v6";

const globalForPrisma = globalThis as unknown as {
  prismaV4: PrismaClient | undefined;
};

const prisma = globalForPrisma.prismaV4 ?? new PrismaClient();
export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaV4 = prisma;
}
