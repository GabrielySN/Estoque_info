import { Module } from "@nestjs/common";
import { EmprestimosController } from "./emprestimos.controller";
import { EmprestimosModule } from "./emprestimos.modules";
import { EmprestimosService } from "./emprestimos.service";

@Module({
  imports: [EmprestimosModule],
  controllers: [EmprestimosController],
  providers: [EmprestimosService],
})
export class EmprestimosHttpModule {}
