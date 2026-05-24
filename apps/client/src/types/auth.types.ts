export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}


export interface User {
  _id: string;

  name: string;

  email: string;

  role: "ADMIN" | "USER";

  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

  emailVerified: boolean;

  createdAt: string;

  updatedAt: string;
}