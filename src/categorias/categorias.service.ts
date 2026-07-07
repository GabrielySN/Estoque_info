import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categoria } from "./categoria.entity";

type CreateCategoriaInput = {
  nomeCategoria: string;
};

type UpdateCategoriaInput = Partial<CreateCategoriaInput>;

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

  create(input: CreateCategoriaInput): Promise<Categoria> {
    return this.categoriasRepository.save(
      this.categoriasRepository.create({
        nomeCategoria: input.nomeCategoria,
      }),
    );
  }

  async update(
    idCategoria: number,
    input: UpdateCategoriaInput,
  ): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({ idCategoria });

    if (!categoria) {
      throw new NotFoundException("Categoria nao encontrada.");
    }

    categoria.nomeCategoria = input.nomeCategoria ?? categoria.nomeCategoria;
    return this.categoriasRepository.save(categoria);
  }

  async remove(idCategoria: number): Promise<void> {
    await this.categoriasRepository.delete(idCategoria);
  }
}
