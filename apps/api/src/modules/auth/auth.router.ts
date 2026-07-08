import { Router } from "express";
import { asyncHandler } from "../../common/async-handler.js";
import { authenticate } from "./auth.middleware.js";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
} from "./auth.schemas.js";
import {
  loginUser,
  refreshUserSession,
  registerMember,
  requestPasswordReset,
  resetPassword,
} from "./auth.service.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const parsed = registerSchema.parse(req.body);
    const result = await registerMember(parsed);
    res.status(201).json({
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  }),
);

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.parse(req.body);
    const result = await loginUser(parsed);
    res.json({
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  }),
);

authRouter.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const parsed = refreshSchema.parse(req.body);
    const result = await refreshUserSession(parsed.refreshToken);
    res.json({
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  }),
);

authRouter.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const parsed = forgotPasswordSchema.parse(req.body);
    await requestPasswordReset(parsed.email);
    res.status(204).send();
  }),
);

authRouter.post(
  "/reset-password",
  asyncHandler(async (req, res) => {
    const parsed = resetPasswordSchema.parse(req.body);
    await resetPassword(parsed.token, parsed.password);
    res.status(204).send();
  }),
);

authRouter.get(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    res.json({ user: req.user });
  }),
);
