import { Controller, Delete, Get, Param } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":emailEscola")
  findOne(@Param("emailEscola") emailEscola: string): Promise<User | null> {
    return this.usersService.findOne(emailEscola);
  }

  @Delete(":emailEscola")
  remove(@Param("emailEscola") emailEscola: string): Promise<void> {
    return this.usersService.remove(emailEscola);
  }
}
