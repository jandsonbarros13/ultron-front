export interface User {
  id: number;
  username: string;
  nome: string;
  ultimo_login?: Date;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
}