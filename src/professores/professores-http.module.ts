import { Module } from "@nestjs/common";
import { ProfessoresController } from "./professores.controller";
import { ProfessoresModule } from "./professores.module";
import { ProfessoresService } from "./professores.service";

@Module({
  imports: [ProfessoresModule],
  controllers: [ProfessoresController],
  providers: [ProfessoresService],
})
export class ProfessoresHttpModule {}
