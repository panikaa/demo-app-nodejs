import { prisma } from "../prismaClient";
import { CronJob } from "cron";

export function startSyncWorker() {
  // Cron format: every 1 minute
  const job = new CronJob("*/1 * * * *", async () => {
    console.log("🔄 Sync job running…");

    const randomEmployees = await prisma.employee.findMany({
      take: 200,
      orderBy: { id: "desc" }
    });

    for (const emp of randomEmployees) {
      await prisma.compensation.create({
        data: {
          employeeId: emp.id,
          amount: emp.salary + Math.round(Math.random() * 200 - 100),
          date: new Date()
        }
      });
    }

    console.log("✔ Sync completed");
  });

  job.start();
}
