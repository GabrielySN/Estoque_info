import { Module } from "@nestjs/common";
import { DirecaoController } from "./direcao.controller";
import { DirecaoModule } from "./direcao.module";
import { DirecaoService } from "./direcao.service";

@Module({
  imports: [DirecaoModule],
  controllers: [DirecaoController],
  providers: [DirecaoService],
})
export class DirecaoHttpModule {}
