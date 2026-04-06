import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Category Enum migration and robust cleanup...");

  try {
    // 1. Migrate Category "product" to "residential"
    const categoryUpdate = await prisma.$runCommandRaw({
      update: "Product",
      updates: [
        {
          q: { category: "product" },
          u: { $set: { category: "residential" } },
          multi: true
        }
      ]
    });
    console.log("Category migration result:", categoryUpdate);

    // 2. Also ensure price/mrp/discount are numeric (robust cleanup rerun)
    const priceUpdate = await prisma.$runCommandRaw({
      update: "Product",
      updates: [
        {
          q: { price: { $type: "string" } },
          u: [
            { 
              $set: { 
                price: { 
                  $convert: { 
                    input: "$price", 
                    to: "double", 
                    onError: 0, 
                    onNull: 0 
                  } 
                } 
              } 
            }
          ],
          multi: true
        },
        {
          q: { mrp: { $type: "string" } },
          u: [
            { 
              $set: { 
                mrp: { 
                  $convert: { 
                    input: "$mrp", 
                    to: "double", 
                    onError: 0, 
                    onNull: 0 
                  } 
                } 
              } 
            }
          ],
          multi: true
        }
      ]
    });
    console.log("Price/MRP robust cleanup result:", priceUpdate);

  } catch (err) {
    console.error("Failed to run migration:", err);
  }

  console.log("Migration finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
