import type { IUser } from "./IUser.interface";

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  level?: IUser["level"];
}
