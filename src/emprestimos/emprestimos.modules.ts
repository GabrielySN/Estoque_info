import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmprestimoAluno } from "./emprestimo-aluno.entity";
import { EmprestimoProfessor } from "./emprestimo-professor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EmprestimoAluno, EmprestimoProfessor])],
  exports: [TypeOrmModule],
})
export class EmprestimosModule {}
