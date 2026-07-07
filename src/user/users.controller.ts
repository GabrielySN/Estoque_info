import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get("perfis")
  findAllWithProfiles() {
    return this.usersService.findAllWithProfiles();
  }

  @Get(":emailEscola/perfil")
  findProfile(@Param("emailEscola") emailEscola: string) {
    return this.usersService.findProfile(emailEscola);
  }

  @Get(":emailEscola")
  findOne(@Param("emailEscola") emailEscola: string): Promise<User | null> {
    return this.usersService.findOne(emailEscola);
  }

  @Post()
  create(@Body() body): Promise<User> {
    return this.usersService.create(body);
  }

  @Post("login")
  login(@Body() body): Promise<User> {
    return this.usersService.login(body);
  }

  @Post("recuperar-senha")
  requestPasswordRecovery(
    @Body("emailEscola") emailEscola: string,
  ): Promise<{ message: string }> {
    return this.usersService.requestPasswordRecovery(emailEscola);
  }

  @Post("confirmar-recuperacao")
  confirmPasswordRecovery(@Body() body): Promise<User> {
    return this.usersService.confirmPasswordRecovery(
      body.emailEscola,
      body.codigo,
      body.senha,
    );
  }

  @Patch(":emailEscola")
  update(@Param("emailEscola") emailEscola: string, @Body() body): Promise<User> {
    return this.usersService.update(emailEscola, body);
  }

  @Patch(":emailEscola/senha")
  resetPassword(
    @Param("emailEscola") emailEscola: string,
    @Body("senha") senha: string,
  ): Promise<User> {
    return this.usersService.resetPassword(emailEscola, senha);
  }

  @Delete(":emailEscola")
  remove(@Param("emailEscola") emailEscola: string): Promise<void> {
    return this.usersService.remove(emailEscola);
  }
}
