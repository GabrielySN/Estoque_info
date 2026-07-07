import { Module } from "@nestjs/common";
import { AlunosController } from "./alunos.controller";
import { AlunosModule } from "./alunos.module";
import { AlunosService } from "./alunos.service";

@Module({
  imports: [AlunosModule],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosHttpModule {}
