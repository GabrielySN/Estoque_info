import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Aluno } from "../alunos/aluno.entity";
import { Direcao } from "../direcao/direcao.entity";
import { Professor } from "../professores/professor.entity";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Aluno, Direcao, Professor])],
  exports: [TypeOrmModule],
})
export class UsersModule {}
