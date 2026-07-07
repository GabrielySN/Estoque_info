import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmprestimoAluno } from "./emprestimo-aluno.entity";
import { EmprestimoProfessor } from "./emprestimo-professor.entity";

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(EmprestimoAluno)
    private readonly emprestimosAlunoRepository: Repository<EmprestimoAluno>,
    @InjectRepository(EmprestimoProfessor)
    private readonly emprestimosProfessorRepository: Repository<EmprestimoProfessor>,
  ) {}

  findAllAlunos(): Promise<EmprestimoAluno[]> {
    return this.emprestimosAlunoRepository.find();
  }

  findOneAluno(idEA: number): Promise<EmprestimoAluno | null> {
    return this.emprestimosAlunoRepository.findOneBy({ idEA });
  }

  async removeAluno(idEA: number): Promise<void> {
    await this.emprestimosAlunoRepository.delete(idEA);
  }

  findAllProfessores(): Promise<EmprestimoProfessor[]> {
    return this.emprestimosProfessorRepository.find();
  }

  findOneProfessor(idEP: number): Promise<EmprestimoProfessor | null> {
    return this.emprestimosProfessorRepository.findOneBy({ idEP });
  }

  async removeProfessor(idEP: number): Promise<void> {
    await this.emprestimosProfessorRepository.delete(idEP);
  }
}
