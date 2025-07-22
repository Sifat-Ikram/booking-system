import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.booking.createMany({
    data: [
      {
        resource: "Room A",
        startTime: new Date("2025-07-21T10:15:00Z"),
        endTime: new Date("2025-07-23T09:30:00Z"),
        requestedBy: "Alice Rahman",
      },
      {
        resource: "Room A",
        startTime: new Date("2025-07-25T13:00:00Z"),
        endTime: new Date("2025-07-26T18:45:00Z"),
        requestedBy: "Tanvir Hasan",
      },
      {
        resource: "Room B",
        startTime: new Date("2025-07-23T08:00:00Z"),
        endTime: new Date("2025-07-25T14:15:00Z"),
        requestedBy: "Fatima Akter",
      },
      {
        resource: "Room B",
        startTime: new Date("2025-07-26T11:30:00Z"),
        endTime: new Date("2025-07-27T16:45:00Z"),
        requestedBy: "Raihan Kabir",
      },
      {
        resource: "Device A",
        startTime: new Date("2025-07-24T08:30:00Z"),
        endTime: new Date("2025-07-24T09:00:00Z"),
        requestedBy: "Nadia Chowdhury",
      },
      {
        resource: "Device A",
        startTime: new Date("2025-07-20T15:00:00Z"),
        endTime: new Date("2025-07-20T16:00:00Z"),
        requestedBy: "Sajib Ahmed",
      },
      {
        resource: "Room C",
        startTime: new Date("2025-07-28T10:00:00Z"),
        endTime: new Date("2025-07-28T12:30:00Z"),
        requestedBy: "Mahin Sultana",
      },
      {
        resource: "Room C",
        startTime: new Date("2025-07-22T17:45:00Z"),
        endTime: new Date("2025-07-22T18:30:00Z"),
        requestedBy: "Sadia Nahar",
      },
      {
        resource: "Room A",
        startTime: new Date("2025-07-29T08:15:00Z"),
        endTime: new Date("2025-07-29T10:30:00Z"),
        requestedBy: "Arefin Zaman",
      },
      {
        resource: "Device B",
        startTime: new Date("2025-07-27T14:00:00Z"),
        endTime: new Date("2025-07-27T15:45:00Z"),
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
