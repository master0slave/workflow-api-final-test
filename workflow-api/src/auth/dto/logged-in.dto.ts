import { Role } from "src/users/entities/users.entity";
export class LoggedInDto {
    id: number;
    username: string
    role: Role;
    sub?: number
  }