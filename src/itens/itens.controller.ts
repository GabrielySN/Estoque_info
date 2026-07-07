import { Controller, Delete, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Item } from "./item.entity";
import { ItensService } from "./itens.service";

@Controller("itens")
export class ItensController {
  constructor(private readonly itensService: ItensService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itensService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) idItens: number): Promise<Item | null> {
    return this.itensService.findOne(idItens);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) idItens: number): Promise<void> {
    return this.itensService.remove(idItens);
  }
}
