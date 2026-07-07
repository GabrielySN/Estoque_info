import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Item } from "../itens/item.entity";
import { User } from "../user/user.entity";
import { EmprestimoAluno } from "./emprestimo-aluno.entity";
import { EmprestimoProfessor } from "./emprestimo-professor.entity";

type CreateEmprestimoInput = {
  emailEscola: string;
  idItens: number;
  dataEmprestimo?: Date | null;
};

type EmprestimoHistorico = {
  tipo: "aluno" | "professor";
  idEmprestimo: number;
  dataEmprestimo: Date | null;
  emailEscola: string;
  nomeUsuario: string | null;
  idItens: number;
  nomeItem: string | null;
  statusItem: string | null;
};

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(EmprestimoAluno)
    private readonly emprestimosAlunoRepository: Repository<EmprestimoAluno>,
    @InjectRepository(EmprestimoProfessor)
    private readonly emprestimosProfessorRepository: Repository<EmprestimoProfessor>,
    @InjectRepository(Item)
    private readonly itensRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  findAllAlunos(): Promise<EmprestimoAluno[]> {
    return this.emprestimosAlunoRepository.find();
  }

  findOneAluno(idEA: number): Promise<EmprestimoAluno | null> {
    return this.emprestimosAlunoRepository.findOneBy({ idEA });
  }

  createAluno(input: CreateEmprestimoInput): Promise<EmprestimoAluno> {
    return this.createEmprestimo("aluno", input);
  }

  async removeAluno(idEA: number): Promise<void> {
    await this.emprestimosAlunoRepository.delete(idEA);
  }

  findAllProfessores(): Promise<EmprestimoProfessor[]> {
    return this.emprestimosProfessorRepository.find();
  }

  findOneProfessor(idEP: number): Promise<EmprestimoProfessor | null> {
    return this.emprestimosProfessorRepository.findOneBy({ idEP });
  }

  createProfessor(input: CreateEmprestimoInput): Promise<EmprestimoProfessor> {
    return this.createEmprestimo("professor", input);
  }

  async removeProfessor(idEP: number): Promise<void> {
    await this.emprestimosProfessorRepository.delete(idEP);
  }

  async findHistorico(): Promise<EmprestimoHistorico[]> {
    const [emprestimosAlunos, emprestimosProfessores, users, itens] =
      await Promise.all([
        this.emprestimosAlunoRepository.find(),
        this.emprestimosProfessorRepository.find(),
        this.usersRepository.find(),
        this.itensRepository.find(),
      ]);

    const usersByEmail = new Map(users.map((user) => [user.emailEscola, user]));
    const itensById = new Map(itens.map((item) => [item.idItens, item]));

    const historicoAlunos = emprestimosAlunos.map((emprestimo) =>
      this.toHistorico(
        "aluno",
        emprestimo.idEA,
        emprestimo.dataEmprestimo,
        emprestimo.emailEscola,
        emprestimo.idItens,
        usersByEmail,
        itensById,
      ),
    );

    const historicoProfessores = emprestimosProfessores.map((emprestimo) =>
      this.toHistorico(
        "professor",
        emprestimo.idEP,
        emprestimo.dataEmprestimo,
        emprestimo.emailEscola,
        emprestimo.idItens,
        usersByEmail,
        itensById,
      ),
    );

    return [...historicoAlunos, ...historicoProfessores].sort((a, b) => {
      const firstDate = a.dataEmprestimo?.getTime() ?? 0;
      const secondDate = b.dataEmprestimo?.getTime() ?? 0;
      return secondDate - firstDate;
    });
  }

  private async createEmprestimo(
    tipo: "aluno",
    input: CreateEmprestimoInput,
  ): Promise<EmprestimoAluno>;
  private async createEmprestimo(
    tipo: "professor",
    input: CreateEmprestimoInput,
  ): Promise<EmprestimoProfessor>;
  private async createEmprestimo(
    tipo: "aluno" | "professor",
    input: CreateEmprestimoInput,
  ): Promise<EmprestimoAluno | EmprestimoProfessor> {
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOneBy(User, {
        emailEscola: input.emailEscola,
      });

      if (!user || user.tipoUsuario !== tipo) {
        throw new BadRequestException("Usuario nao pertence ao tipo informado.");
      }

      const item = await manager.findOneBy(Item, { idItens: input.idItens });

      if (!item) {
        throw new NotFoundException("Item nao encontrado.");
      }

      if (item.statusItem !== "disponivel" || item.qtdItem <= 0) {
        throw new BadRequestException("Item nao esta disponivel para emprestimo.");
      }

      item.statusItem = "indisponivel";
      await manager.save(Item, item);

      if (tipo === "aluno") {
        const emprestimo = manager.create(EmprestimoAluno, {
          emailEscola: input.emailEscola,
          idItens: input.idItens,
          dataEmprestimo: input.dataEmprestimo ?? null,
        });

        return manager.save(EmprestimoAluno, emprestimo);
      }

      const emprestimo = manager.create(EmprestimoProfessor, {
        emailEscola: input.emailEscola,
        idItens: input.idItens,
        dataEmprestimo: input.dataEmprestimo ?? null,
      });

      return manager.save(EmprestimoProfessor, emprestimo);
    });
  }

  private toHistorico(
    tipo: "aluno" | "professor",
    idEmprestimo: number,
    dataEmprestimo: Date | null,
    emailEscola: string,
    idItens: number,
    usersByEmail: Map<string, User>,
    itensById: Map<number, Item>,
  ): EmprestimoHistorico {
    const user = usersByEmail.get(emailEscola);
    const item = itensById.get(idItens);

    return {
      tipo,
      idEmprestimo,
      dataEmprestimo,
      emailEscola,
      nomeUsuario: user?.nomeUsuario ?? null,
      idItens,
      nomeItem: item?.nomeItem ?? null,
      statusItem: item?.statusItem ?? null,
    };
  }
}
