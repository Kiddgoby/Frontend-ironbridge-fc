export interface User {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password?: string;
}
