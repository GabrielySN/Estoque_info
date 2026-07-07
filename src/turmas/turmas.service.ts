import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Turma } from "./turma.entity";

@Injectable()
export class TurmasService {
  constructor(
    @InjectRepository(Turma)
    private readonly turmasRepository: Repository<Turma>,
  ) {}

  findAll(): Promise<Turma[]> {
    return this.turmasRepository.find();
  }

  findOne(nomeTurma: string): Promise<Turma | null> {
    return this.turmasRepository.findOneBy({ nomeTurma });
  }

  async remove(nomeTurma: string): Promise<void> {
    await this.turmasRepository.delete(nomeTurma);
  }
}
