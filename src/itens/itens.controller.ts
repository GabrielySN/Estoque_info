import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { Item } from "./item.entity";
import { ItensService } from "./itens.service";

@Controller("itens")
export class ItensController {
  constructor(private readonly itensService: ItensService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itensService.findAll();
  }

  @Get("disponiveis")
  findAvailable(): Promise<Item[]> {
    return this.itensService.findAvailable();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) idItens: number): Promise<Item | null> {
    return this.itensService.findOne(idItens);
  }

  @Post()
  create(@Body() body): Promise<Item> {
    return this.itensService.create(body);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) idItens: number,
    @Body() body,
  ): Promise<Item> {
    return this.itensService.update(idItens, body);
  }

  @Patch(":id/baixa")
  baixar(
    @Param("id", ParseIntPipe) idItens: number,
    @Body() body,
  ): Promise<Item> {
    return this.itensService.baixar(idItens, body);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) idItens: number): Promise<void> {
    return this.itensService.remove(idItens);
  }
}
