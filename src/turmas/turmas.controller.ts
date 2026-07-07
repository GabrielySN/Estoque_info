import { Controller, Delete, Get, Param } from "@nestjs/common";
import { Turma } from "./turma.entity";
import { TurmasService } from "./turmas.service";

@Controller("turmas")
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Get()
  findAll(): Promise<Turma[]> {
    return this.turmasService.findAll();
  }

  @Get(":nomeTurma")
  findOne(@Param("nomeTurma") nomeTurma: string): Promise<Turma | null> {
    return this.turmasService.findOne(nomeTurma);
  }

  @Delete(":nomeTurma")
  remove(@Param("nomeTurma") nomeTurma: string): Promise<void> {
    return this.turmasService.remove(nomeTurma);
  }
}
