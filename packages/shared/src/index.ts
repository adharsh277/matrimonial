export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MEMBER";

export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "LOCKED";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
