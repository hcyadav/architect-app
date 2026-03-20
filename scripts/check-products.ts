
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function main() {
  console.log('Querying corporate products...');
  const products = await prisma.product.findMany({
    where: { category: 'corporate' },
    select: { id: true, title: true, category: true, subCategory: true }
  });
  
  console.log(`Found ${products.length} corporate products.`);
  products.forEach(p => {
    console.log(`- ID: ${p.id}, Title: ${p.title}, SubCategory: "${p.subCategory}"`);
  });

  const subCats = await prisma.product.findMany({
    where: { category: 'corporate' },
    distinct: ['subCategory'],
    select: { subCategory: true }
  });
  console.log('Distinct subcategories for corporate:', subCats.map(s => s.subCategory));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
