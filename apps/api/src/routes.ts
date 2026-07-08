import { Router } from "express";
import { authRouter } from "./modules/auth/auth.router.js";
import { usersRouter } from "./modules/users/users.router.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
