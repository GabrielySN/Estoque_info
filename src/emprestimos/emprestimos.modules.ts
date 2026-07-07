import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../itens/item.entity";
import { User } from "../user/user.entity";
import { EmprestimoAluno } from "./emprestimo-aluno.entity";
import { EmprestimoProfessor } from "./emprestimo-professor.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmprestimoAluno,
      EmprestimoProfessor,
      Item,
      User,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class EmprestimosModule {}
