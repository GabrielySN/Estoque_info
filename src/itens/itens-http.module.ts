import { Module } from "@nestjs/common";
import { ItensController } from "./itens.controller";
import { ItensModule } from "./itens.module";
import { ItensService } from "./itens.service";

@Module({
  imports: [ItensModule],
  controllers: [ItensController],
  providers: [ItensService],
})
export class ItensHttpModule {}
