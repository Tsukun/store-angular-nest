export interface TokenI {
  userId?: string;
  refreshToken?: string;
}
export interface UserI {
  email: string;
  _id: string;
  isActivated: boolean;
}

export interface PayloadUserI {
  email: string;
  id: string;
  isActivated: boolean;
}

export interface UserJwtPayload {
  email: string;
  id: string;
  isActivated: boolean;
  iat: number;
  exp: number;
}
