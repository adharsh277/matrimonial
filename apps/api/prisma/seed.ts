import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@12345", 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@matrimonial.local" },
    update: {},
    create: {
      email: "admin@matrimonial.local",
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      firstName: "Super",
      lastName: "Admin",
      phone: "+919999999999",
      emailVerifiedAt: new Date(),
    },
  });

  const memberPassword = await bcrypt.hash("Member@12345", 12);

  const member = await prisma.user.upsert({
    where: { email: "member@matrimonial.local" },
    update: {},
    create: {
      email: "member@matrimonial.local",
      passwordHash: memberPassword,
      role: UserRole.MEMBER,
      status: UserStatus.ACTIVE,
      firstName: "Demo",
      lastName: "Member",
      phone: "+918888888888",
      emailVerifiedAt: new Date(),
    },
  });

  await prisma.newsPost.upsert({
    where: { slug: "welcome-to-the-community" },
    update: {},
    create: {
      title: "Welcome to the Community",
      slug: "welcome-to-the-community",
      body: "This is a sample public notice seeded for the initial application setup.",
      audience: "PUBLIC",
      publishedAt: new Date(),
      createdById: superAdmin.id,
    },
  });

  await prisma.matrimonyProfile.upsert({
    where: { userId: member.id },
    update: {},
    create: {
      userId: member.id,
      status: "APPROVED",
      headline: "Open to suitable profiles",
      aboutMe: "Sample matrimony profile for initial data.",
      education: "Graduate",
      profession: "Professional",
      location: "Mumbai, India",
      publicVisible: true,
      approvedAt: new Date(),
      approvedById: superAdmin.id,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
