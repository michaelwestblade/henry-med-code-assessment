import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const provider1 = await prisma.provider.upsert({
    where: {
      email: 'provider1@test.net',
    },
    update: {},
    create: {
      email: 'provider1@test.net',
      name: 'provider1',
      phoneNumber: '8169166666',
    },
  });

  const provider2 = await prisma.provider.upsert({
    where: {
      email: 'provider2@test.net',
    },
    update: {},
    create: {
      email: 'provider2@test.net',
      name: 'provider2',
      phoneNumber: '8169164444',
    },
  });

  const client1 = await prisma.client.upsert({
    where: {
      email: 'client1@test.net',
    },
    update: {},
    create: {
      email: 'client1@test.net',
      name: 'client1',
      phoneNumber: '8169161111',
    },
  });

  const client2 = await prisma.client.upsert({
    where: {
      email: 'client2@test.net',
    },
    update: {},
    create: {
      email: 'client2@test.net',
      name: 'client2',
      phoneNumber: '8169162222',
    },
  });

  const client3 = await prisma.client.upsert({
    where: {
      email: 'client3@test.net',
    },
    update: {},
    create: {
      email: 'client3@test.net',
      name: 'client3',
      phoneNumber: '8169163333',
    },
  });

  const client4 = await prisma.client.upsert({
    where: {
      email: 'client4@test.net',
    },
    update: {},
    create: {
      email: 'client4@test.net',
      name: 'client4',
      phoneNumber: '8169165555',
    },
  });

  const client5 = await prisma.client.upsert({
    where: {
      email: 'client5@test.net',
    },
    update: {},
    create: {
      email: 'client5@test.net',
      name: 'client5',
      phoneNumber: '8169167777',
    },
  });

  const client6 = await prisma.client.upsert({
    where: {
      email: 'client6@test.net',
    },
    update: {},
    create: {
      email: 'client6@test.net',
      name: 'client6',
      phoneNumber: '8169168888',
    },
  });

  console.log({
    provider1,
    provider2,
    client1,
    client2,
    client3,
    client4,
    client5,
    client6,
  });
}

// execute the main function

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    // close Prisma Client at the end

    await prisma.$disconnect();
  });
