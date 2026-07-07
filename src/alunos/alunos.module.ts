import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Aluno } from "./aluno.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  exports: [TypeOrmModule],
})
export class AlunosModule {}
