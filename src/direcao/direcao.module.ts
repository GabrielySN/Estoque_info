import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Direcao } from "./direcao.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Direcao])],
  exports: [TypeOrmModule],
})
export class DirecaoModule {}
