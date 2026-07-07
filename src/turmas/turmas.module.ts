import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Turma } from "./turma.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Turma])],
  exports: [TypeOrmModule],
})
export class TurmasModule {}
