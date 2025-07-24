import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.booking.createMany({
    data: [
      {
        resource: "Room A",
        startTime: new Date("2025-07-21T10:00:00Z"),
        endTime: new Date("2025-07-21T11:30:00Z"), // 1.5 hours
        requestedBy: "Alice Rahman",
      },
      {
        resource: "Room A",
        startTime: new Date("2025-07-21T13:00:00Z"),
        endTime: new Date("2025-07-21T15:00:00Z"), // 2 hours
        requestedBy: "Tanvir Hasan",
      },
      {
        resource: "Room B",
        startTime: new Date("2025-07-22T09:00:00Z"),
        endTime: new Date("2025-07-22T10:15:00Z"), // 1 hour 15 mins
        requestedBy: "Fatima Akter",
      },
      {
        resource: "Room B",
        startTime: new Date("2025-07-22T11:00:00Z"),
        endTime: new Date("2025-07-22T12:30:00Z"), // 1.5 hours
        requestedBy: "Raihan Kabir",
      },
      {
        resource: "Device A",
        startTime: new Date("2025-07-23T14:00:00Z"),
        endTime: new Date("2025-07-23T14:30:00Z"), // 30 mins
        requestedBy: "Nadia Chowdhury",
      },
      {
        resource: "Device A",
        startTime: new Date("2025-07-23T15:00:00Z"),
        endTime: new Date("2025-07-23T16:00:00Z"), // 1 hour
        requestedBy: "Sajib Ahmed",
      },
      {
        resource: "Room C",
        startTime: new Date("2025-07-24T10:00:00Z"),
        endTime: new Date("2025-07-24T11:30:00Z"), // 1.5 hours
        requestedBy: "Mahin Sultana",
      },
      {
        resource: "Room C",
        startTime: new Date("2025-07-24T16:00:00Z"),
        endTime: new Date("2025-07-24T17:00:00Z"), // 1 hour
        requestedBy: "Sadia Nahar",
      },
      {
        resource: "Room A",
        startTime: new Date("2025-07-25T08:30:00Z"),
        endTime: new Date("2025-07-25T10:00:00Z"), // 1.5 hours
        requestedBy: "Arefin Zaman",
      },
      {
        resource: "Device B",
        startTime: new Date("2025-07-25T14:00:00Z"),
        endTime: new Date("2025-07-25T15:45:00Z"), // 1 hour 45 mins
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
