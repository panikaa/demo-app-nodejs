import { prisma } from "../prismaClient";

export async function generateInitialData() {
  const exists = await prisma.employee.count();
  if (exists > 0) return;

  console.log("🚀 Generating 5k employees…");

  const departments = ["Engineering", "HR", "Finance", "Marketing", "Sales"];
  for (let i = 0; i < departments.length; i++) {
    await prisma.department.create({
      data: { name: departments[i] }
    });
  }

  const deptList = await prisma.department.findMany();

  const batch = [];
  for (let i = 1; i <= 5000; i++) {
    const d = deptList[Math.floor(Math.random() * deptList.length)];

    batch.push({
      firstName: `User${i}`,
      lastName: "Test",
      email: `user${i}@corp.com`,
      position: "Employee",
      salary: 3000 + Math.floor(Math.random() * 5000),
      hireDate: new Date(2018 + Math.floor(Math.random() * 6), 1, 1),
      departmentId: d.id,
      skills: ["TypeScript", "Communication", "Docker"]
    });

    if (batch.length === 500) {
      await prisma.employee.createMany({ data: batch });
      batch.length = 0;
    }
  }

  console.log("🔥 Done generating employees!");
}
