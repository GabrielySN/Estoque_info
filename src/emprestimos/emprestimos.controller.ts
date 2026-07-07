import { Controller, Delete, Get, Param, ParseIntPipe } from "@nestjs/common";
import { EmprestimoAluno } from "./emprestimo-aluno.entity";
import { EmprestimoProfessor } from "./emprestimo-professor.entity";
import { EmprestimosService } from "./emprestimos.service";

@Controller("emprestimos")
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Get("alunos")
  findAllAlunos(): Promise<EmprestimoAluno[]> {
    return this.emprestimosService.findAllAlunos();
  }

  @Get("alunos/:id")
  findOneAluno(
    @Param("id", ParseIntPipe) idEA: number,
  ): Promise<EmprestimoAluno | null> {
    return this.emprestimosService.findOneAluno(idEA);
  }

  @Delete("alunos/:id")
  removeAluno(@Param("id", ParseIntPipe) idEA: number): Promise<void> {
    return this.emprestimosService.removeAluno(idEA);
  }

  @Get("professores")
  findAllProfessores(): Promise<EmprestimoProfessor[]> {
    return this.emprestimosService.findAllProfessores();
  }

  @Get("professores/:id")
  findOneProfessor(
    @Param("id", ParseIntPipe) idEP: number,
  ): Promise<EmprestimoProfessor | null> {
    return this.emprestimosService.findOneProfessor(idEP);
  }

  @Delete("professores/:id")
  removeProfessor(@Param("id", ParseIntPipe) idEP: number): Promise<void> {
    return this.emprestimosService.removeProfessor(idEP);
  }
}
