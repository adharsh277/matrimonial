import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../../common/http-error.js";
import { verifyAccessToken } from "./auth.service.js";
import type { UserRole } from "@prisma/client";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new HttpError(401, "Unauthorized"));
    return;
  }

  try {
    const token = header.slice(7);
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new HttpError(401, "Unauthorized"));
  }
}

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role = req.user?.role as UserRole | undefined;

    if (!role || !allowedRoles.includes(role)) {
      next(new HttpError(403, "Forbidden"));
      return;
    }

    next();
  };
}
