import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.booking.createMany({
    data: [
      {
        resource: "Room A",
        startTime: new Date("2025-07-25T10:00:00.000Z"),
        endTime: new Date("2025-07-25T11:00:00.000Z"),
        requestedBy: "Alice Rahman",
      },
      {
        resource: "Room A",
        startTime: new Date("2025-07-25T13:30:00.000Z"),
        endTime: new Date("2025-07-25T14:15:00.000Z"),
        requestedBy: "Tanvir Hasan",
      },
      {
        resource: "Room B",
        startTime: new Date("2025-07-25T09:00:00.000Z"),
        endTime: new Date("2025-07-25T10:30:00.000Z"),
        requestedBy: "Fatima Akter",
      },
      {
        resource: "Room B",
        startTime: new Date("2025-07-25T16:00:00.000Z"),
        endTime: new Date("2025-07-25T17:00:00.000Z"),
        requestedBy: "Raihan Kabir",
      },
      {
        resource: "Device A",
        startTime: new Date("2025-07-25T08:00:00.000Z"),
        endTime: new Date("2025-07-25T08:30:00.000Z"),
        requestedBy: "Nadia Chowdhury",
      },
      {
        resource: "Device A",
        startTime: new Date("2025-07-25T12:00:00.000Z"),
        endTime: new Date("2025-07-25T13:00:00.000Z"),
        requestedBy: "Sajib Ahmed",
      },
      {
        resource: "Room C",
        startTime: new Date("2025-07-25T14:00:00.000Z"),
        endTime: new Date("2025-07-25T15:45:00.000Z"),
        requestedBy: "Mahin Sultana",
      },
      {
        resource: "Room C",
        startTime: new Date("2025-07-25T18:00:00.000Z"),
        endTime: new Date("2025-07-25T18:30:00.000Z"),
        requestedBy: "Sadia Nahar",
      },
      {
        resource: "Room A",
        startTime: new Date("2025-07-26T09:30:00.000Z"),
        endTime: new Date("2025-07-26T10:30:00.000Z"),
        requestedBy: "Arefin Zaman",
      },
      {
        resource: "Device B",
        startTime: new Date("2025-07-26T15:00:00.000Z"),
        endTime: new Date("2025-07-26T16:00:00.000Z"),
        requestedBy: "Rumana Hossain",
      },
    ],
  });

  console.log("🌱 Demo bookings seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
