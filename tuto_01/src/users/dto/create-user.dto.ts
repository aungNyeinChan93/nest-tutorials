/* eslint-disable prettier/prettier */
import { CreateUser } from "../schemas/users.zod-schema";

export class CreateUserDto implements CreateUser {

    name: string;

    email: string;

    password: string
}
