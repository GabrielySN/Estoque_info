import { Controller, Delete, Get, Param } from "@nestjs/common";
import { Direcao } from "./direcao.entity";
import { DirecaoService } from "./direcao.service";

@Controller("direcao")
export class DirecaoController {
  constructor(private readonly direcaoService: DirecaoService) {}

  @Get()
  findAll(): Promise<Direcao[]> {
    return this.direcaoService.findAll();
  }

  @Get(":emailEscola")
  findOne(@Param("emailEscola") emailEscola: string): Promise<Direcao | null> {
    return this.direcaoService.findOne(emailEscola);
  }

  @Delete(":emailEscola")
  remove(@Param("emailEscola") emailEscola: string): Promise<void> {
    return this.direcaoService.remove(emailEscola);
  }
}
