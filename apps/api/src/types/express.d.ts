import type { TokenPayload } from "../modules/auth/auth.service.js";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
