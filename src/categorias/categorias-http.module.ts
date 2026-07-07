import { Module } from "@nestjs/common";
import { CategoriasController } from "./categorias.controller";
import { CategoriasModule } from "./categorias.module";
import { CategoriasService } from "./categorias.service";

@Module({
  imports: [CategoriasModule],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasHttpModule {}
