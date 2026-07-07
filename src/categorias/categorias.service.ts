import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categoria } from "./categoria.entity";

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  findOne(idCategoria: number): Promise<Categoria | null> {
    return this.categoriasRepository.findOneBy({ idCategoria });
  }

  async remove(idCategoria: number): Promise<void> {
    await this.categoriasRepository.delete(idCategoria);
  }
}
