import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Aluno } from "./aluno.entity";

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunosRepository: Repository<Aluno>,
  ) {}

  findAll(): Promise<Aluno[]> {
    return this.alunosRepository.find();
  }

  findOne(emailEscola: string): Promise<Aluno | null> {
    return this.alunosRepository.findOneBy({ emailEscola });
  }

  async remove(emailEscola: string): Promise<void> {
    await this.alunosRepository.delete(emailEscola);
  }
}
