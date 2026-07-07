import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Professor } from "./professor.entity";

@Injectable()
export class ProfessoresService {
  constructor(
    @InjectRepository(Professor)
    private readonly professoresRepository: Repository<Professor>,
  ) {}

  findAll(): Promise<Professor[]> {
    return this.professoresRepository.find();
  }

  findOne(emailEscola: string): Promise<Professor | null> {
    return this.professoresRepository.findOneBy({ emailEscola });
  }

  async remove(emailEscola: string): Promise<void> {
    await this.professoresRepository.delete(emailEscola);
  }
}
