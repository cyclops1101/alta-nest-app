import { PrismaClient } from '../src/generated-client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('1234', 10);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: password,
      name: 'Alice Doe',
      invoices: {
        create: [
          {
            vendor_name: 'Acme Supplies',
            amount: 420.75,
            due_date: new Date('2025-06-15'),
            description: 'Office chairs and desks',
            paid: false,
          },
          {
            vendor_name: 'Ink & Toner Co.',
            amount: 89.99,
            due_date: new Date('2025-07-01'),
            description: 'Printer ink cartridges',
            paid: true,
          },
          {
            vendor_name: 'CleanIt Janitorial',
            amount: 135.5,
            due_date: new Date('2025-06-20'),
            description: 'Monthly cleaning services',
            paid: false,
          },
          {
            vendor_name: 'Fresh Fruit Co.',
            amount: 312.0,
            due_date: new Date('2025-06-25'),
            description: 'Office snack delivery',
            paid: true,
          },
          {
            vendor_name: 'Staple Solutions',
            amount: 48.99,
            due_date: new Date('2025-07-05'),
            description: 'Paper and staples',
            paid: false,
          },
          {
            vendor_name: 'Tech Repairs Ltd.',
            amount: 229.5,
            due_date: new Date('2025-06-28'),
            description: 'Printer repair services',
            paid: true,
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password: password,
      name: 'Bob Smith',
      invoices: {
        create: [
          {
            vendor_name: 'LogiTech Distributors',
            amount: 550.0,
            due_date: new Date('2025-06-30'),
            description: 'New keyboards and mice',
            paid: false,
          },
          {
            vendor_name: 'Green Office Plants',
            amount: 120.25,
            due_date: new Date('2025-07-03'),
            description: 'Indoor plant care services',
            paid: true,
          },
          {
            vendor_name: 'Office Depot',
            amount: 79.99,
            due_date: new Date('2025-07-10'),
            description: 'Desk organizers and supplies',
            paid: false,
          },
          {
            vendor_name: 'IT Support Now',
            amount: 430.0,
            due_date: new Date('2025-07-15'),
            description: 'On-site tech support contract',
            paid: true,
          },
        ],
      },
    },
  });

  console.log(`Seeded users:
  - ${alice.email} (6 invoices)
  - ${bob.email} (4 invoices)
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
