import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./item.entity";

type CreateItemInput = {
  nomeItem: string;
  modeloItem?: string | null;
  qtdItem?: number;
  statusItem?: Item["statusItem"];
  idCategoria?: number | null;
};

type UpdateItemInput = Partial<CreateItemInput>;

type BaixaItemInput = {
  quantidade?: number;
};

@Injectable()
export class ItensService {
  constructor(
    @InjectRepository(Item)
    private readonly itensRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itensRepository.find();
  }

  findAvailable(): Promise<Item[]> {
    return this.itensRepository.findBy({ statusItem: "disponivel" });
  }

  findOne(idItens: number): Promise<Item | null> {
    return this.itensRepository.findOneBy({ idItens });
  }

  create(input: CreateItemInput): Promise<Item> {
    const item = this.itensRepository.create({
      nomeItem: input.nomeItem,
      modeloItem: input.modeloItem ?? null,
      qtdItem: input.qtdItem ?? 0,
      statusItem: input.statusItem ?? "disponivel",
      idCategoria: input.idCategoria ?? null,
    });

    return this.itensRepository.save(item);
  }

  async update(idItens: number, input: UpdateItemInput): Promise<Item> {
    const item = await this.itensRepository.findOneBy({ idItens });

    if (!item) {
      throw new NotFoundException("Item nao encontrado.");
    }

    await this.itensRepository.update(idItens, {
      nomeItem: input.nomeItem ?? item.nomeItem,
      modeloItem: input.modeloItem ?? item.modeloItem,
      qtdItem: input.qtdItem ?? item.qtdItem,
      statusItem: input.statusItem ?? item.statusItem,
      idCategoria: input.idCategoria ?? item.idCategoria,
    });

    const updatedItem = await this.itensRepository.findOneBy({ idItens });

    if (!updatedItem) {
      throw new NotFoundException("Item nao encontrado.");
    }

    return updatedItem;
  }

  async baixar(idItens: number, input: BaixaItemInput): Promise<Item> {
    const quantidade = input.quantidade ?? 1;
    const item = await this.itensRepository.findOneBy({ idItens });

    if (!item) {
      throw new NotFoundException("Item nao encontrado.");
    }

    if (quantidade <= 0) {
      throw new BadRequestException("A quantidade da baixa deve ser maior que zero.");
    }

    if (item.qtdItem < quantidade) {
      throw new BadRequestException("Quantidade insuficiente em estoque.");
    }

    item.qtdItem -= quantidade;

    if (item.qtdItem === 0) {
      item.statusItem = "indisponivel";
    }

    return this.itensRepository.save(item);
  }

  async remove(idItens: number): Promise<void> {
    await this.itensRepository.delete(idItens);
  }
}
