import { Controller, Delete, Get, Param } from "@nestjs/common";
import { Aluno } from "./aluno.entity";
import { AlunosService } from "./alunos.service";

@Controller("alunos")
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  findAll(): Promise<Aluno[]> {
    return this.alunosService.findAll();
  }

  @Get(":emailEscola")
  findOne(@Param("emailEscola") emailEscola: string): Promise<Aluno | null> {
    return this.alunosService.findOne(emailEscola);
  }

  @Delete(":emailEscola")
  remove(@Param("emailEscola") emailEscola: string): Promise<void> {
    return this.alunosService.remove(emailEscola);
  }
}
