import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./item.entity";

@Injectable()
export class ItensService {
  constructor(
    @InjectRepository(Item)
    private readonly itensRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itensRepository.find();
  }

  findOne(idItens: number): Promise<Item | null> {
    return this.itensRepository.findOneBy({ idItens });
  }

  async remove(idItens: number): Promise<void> {
    await this.itensRepository.delete(idItens);
  }
}
