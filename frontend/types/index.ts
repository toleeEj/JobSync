// types/index.ts
export interface User {
  id: number;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  user: User;
  refresh: string;
  access: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password2: string;
  role: string;
}

export enum UserRole {
  JOB_SEEKER = "job_seeker",
  EMPLOYER = "employer",
  ADMIN = "admin",
}
