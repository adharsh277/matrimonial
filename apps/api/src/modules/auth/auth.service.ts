import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";
import { HttpError } from "../../common/http-error.js";
import { createSecureToken, hashToken } from "../../common/crypto.js";
import { sendMail } from "../../common/mailer.js";

export type TokenPayload = {
  sub: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

function signAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_TTL });
}

function signRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_TTL });
}

export async function issueAuthTokens(user: { id: string; email: string; role: UserRole; status: UserStatus }) {
  const tokenPayload: TokenPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  const refreshHash = hashToken(refreshToken);
  const decoded = jwt.decode(refreshToken) as jwt.JwtPayload | null;

  if (!decoded?.exp) {
    throw new HttpError(500, "Failed to issue refresh token");
  }

  await prisma.refreshToken.create({
    data: {
      tokenHash: refreshHash,
      userId: user.id,
      expiresAt: new Date(decoded.exp * 1000),
    },
  });

  return { accessToken, refreshToken };
}

export async function registerMember(input: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
}) {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, ...(input.phone ? [{ phone: input.phone }] : [])],
    },
  });

  if (existing) {
    throw new HttpError(409, "User already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      passwordHash,
      role: UserRole.MEMBER,
      status: UserStatus.PENDING,
    },
  });

  const tokens = await issueAuthTokens({
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  });

  return { user, ...tokens };
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user || user.deletedAt) {
    throw new HttpError(401, "Invalid credentials");
  }

  if (user.status === UserStatus.LOCKED || (user.lockedUntil && user.lockedUntil > new Date())) {
    throw new HttpError(423, "Account locked");
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);

  if (!passwordMatches) {
    const failedLoginCount = user.failedLoginCount + 1;
    const lockedUntil = failedLoginCount >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount,
        lockedUntil,
        status: lockedUntil ? UserStatus.LOCKED : user.status,
      },
    });

    throw new HttpError(401, "Invalid credentials");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
      status: UserStatus.ACTIVE,
    },
  });

  const tokens = await issueAuthTokens({
    id: updatedUser.id,
    email: updatedUser.email,
    role: updatedUser.role,
    status: updatedUser.status,
  });

  return { user: updatedUser, ...tokens };
}

export async function refreshUserSession(refreshToken: string) {
  const tokenHash = hashToken(refreshToken);
  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
    throw new HttpError(401, "Invalid refresh token");
  }

  jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

  const { accessToken, refreshToken: newRefreshToken } = await issueAuthTokens({
    id: storedToken.user.id,
    email: storedToken.user.email,
    role: storedToken.user.role,
    status: storedToken.user.status,
  });

  await prisma.refreshToken.update({
    where: { id: storedToken.id },
    data: { revokedAt: new Date() },
  });

  return { accessToken, refreshToken: newRefreshToken, user: storedToken.user };
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return;
  }

  const token = createSecureToken(32);
  const tokenHash = hashToken(token);

  await prisma.passwordResetToken.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  const link = `${env.APP_URL}/reset-password?token=${token}`;

  await sendMail({
    to: user.email,
    subject: "Reset your password",
    text: `Use this link to reset your password: ${link}`,
    html: `<p>Use this link to reset your password:</p><p><a href="${link}">${link}</a></p>`,
  });
}

export async function resetPassword(token: string, password: string) {
  const tokenHash = hashToken(token);
  const resetRecord = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!resetRecord || resetRecord.usedAt || resetRecord.expiresAt < new Date()) {
    throw new HttpError(400, "Invalid or expired reset token");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetRecord.userId },
      data: { passwordHash, failedLoginCount: 0, lockedUntil: null, status: UserStatus.ACTIVE },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetRecord.id },
      data: { usedAt: new Date() },
    }),
  ]);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}
