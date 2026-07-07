import { Module } from "@nestjs/common";
import { TurmasController } from "./turmas.controller";
import { TurmasModule } from "./turmas.module";
import { TurmasService } from "./turmas.service";

@Module({
  imports: [TurmasModule],
  controllers: [TurmasController],
  providers: [TurmasService],
})
export class TurmasHttpModule {}
