import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fetching products from DummyJSON...');
  const res = await fetch('https://dummyjson.com/products?limit=200');
  const data = await res.json();
  const products = data.products;

  console.log(`Fetched ${products.length} products. Seeding into database...`);

  for (const p of products) {
    const productData = {
      title: p.title,
      description: p.description,
      category: p.category,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      tags: p.tags || [],
      brand: p.brand,
      sku: p.sku,
      weight: p.weight,
      dimensions: p.dimensions || undefined,
      warrantyInformation: p.warrantyInformation,
      shippingInformation: p.shippingInformation,
      availabilityStatus: p.availabilityStatus,
      reviews: p.reviews || undefined,
      returnPolicy: p.returnPolicy,
      minimumOrderQuantity: p.minimumOrderQuantity,
      meta: p.meta || undefined,
      images: p.images || [],
      thumbnail: p.thumbnail,
    };

    // We use upsert to avoid duplicate errors if the script is run multiple times
    // However, since dummyjson items don't have public_id initially, we can just create them.
    // To prevent total duplication, let's just create. If they want to rerun, they should wipe DB.
    await prisma.product.create({
      data: productData,
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
