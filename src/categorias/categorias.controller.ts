import { Controller, Delete, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Categoria } from "./categoria.entity";
import { CategoriasService } from "./categorias.service";

@Controller("categorias")
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) idCategoria: number,
  ): Promise<Categoria | null> {
    return this.categoriasService.findOne(idCategoria);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) idCategoria: number): Promise<void> {
    return this.categoriasService.remove(idCategoria);
  }
}
