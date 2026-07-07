import { Controller, Delete, Get, Param } from "@nestjs/common";
import { Professor } from "./professor.entity";
import { ProfessoresService } from "./professores.service";

@Controller("professores")
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Get()
  findAll(): Promise<Professor[]> {
    return this.professoresService.findAll();
  }

  @Get(":emailEscola")
  findOne(
    @Param("emailEscola") emailEscola: string,
  ): Promise<Professor | null> {
    return this.professoresService.findOne(emailEscola);
  }

  @Delete(":emailEscola")
  remove(@Param("emailEscola") emailEscola: string): Promise<void> {
    return this.professoresService.remove(emailEscola);
  }
}
