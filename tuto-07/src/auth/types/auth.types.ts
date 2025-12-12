/* eslint-disable prettier/prettier */

import { UserRoles } from "src/users/types/users.types";


export type ValidateUser = {
  email: string;
  password: string;
};

export type ValidatedUser = {
  id: number;
  name: string;
  email: string;
  role: UserRoles;
  hashRefreshToken?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

export type JwtAuthPayload = {
  sub: number;
  email: string;
};
