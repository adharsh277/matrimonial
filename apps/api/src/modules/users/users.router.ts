import { Router } from "express";
import { asyncHandler } from "../../common/async-handler.js";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { prisma } from "../../config/prisma.js";
import { UserRole } from "@prisma/client";

export const usersRouter = Router();

usersRouter.get(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.sub },
      include: { families: true, matrimonyProfiles: true },
    });

    res.json({ user });
  }),
);

usersRouter.get(
  "/",
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  asyncHandler(async (_req, res) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    res.json({ users });
  }),
);
