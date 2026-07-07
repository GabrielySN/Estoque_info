import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Direcao } from "./direcao.entity";

@Injectable()
export class DirecaoService {
  constructor(
    @InjectRepository(Direcao)
    private readonly direcaoRepository: Repository<Direcao>,
  ) {}

  findAll(): Promise<Direcao[]> {
    return this.direcaoRepository.find();
  }

  findOne(emailEscola: string): Promise<Direcao | null> {
    return this.direcaoRepository.findOneBy({ emailEscola });
  }

  async remove(emailEscola: string): Promise<void> {
    await this.direcaoRepository.delete({ emailEscola });
  }
}
