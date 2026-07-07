import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Aluno } from "../alunos/aluno.entity";
import { Direcao } from "../direcao/direcao.entity";
import { Professor } from "../professores/professor.entity";
import { User, UserType } from "./user.entity";

type CreateUserInput = {
  emailEscola: string;
  nomeUsuario: string;
  senha: string;
  tipoUsuario: UserType;
  nomeTurma?: string | null;
  numChamada?: number | null;
  idDirecao?: number | null;
  materia?: string | null;
};

type UpdateUserInput = Partial<Omit<CreateUserInput, "emailEscola">>;

type LoginInput = {
  emailEscola: string;
  senha: string;
};

type UserProfile = User & {
  nomeTurma?: string | null;
  numChamada?: number | null;
  idDirecao?: number | null;
  materia?: string | null;
};

type PasswordRecoveryCode = {
  code: string;
  expiresAt: Date;
};

@Injectable()
export class UsersService {
  private readonly passwordRecoveryCodes = new Map<string, PasswordRecoveryCode>();

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findAllWithProfiles(): Promise<UserProfile[]> {
    const users = await this.usersRepository.find();
    return Promise.all(users.map((user) => this.mergeProfile(user)));
  }

  findOne(emailEscola: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ emailEscola });
  }

  async findProfile(emailEscola: string): Promise<UserProfile> {
    const user = await this.usersRepository.findOneBy({ emailEscola });

    if (!user) {
      throw new NotFoundException("Usuario nao encontrado.");
    }

    return this.mergeProfile(user);
  }

  async create(input: CreateUserInput): Promise<User> {
    this.validateSchoolEmail(input.emailEscola);

    return this.dataSource.transaction(async (manager) => {
      const savedUser = await manager.save(
        User,
        manager.create(User, {
          emailEscola: input.emailEscola,
          nomeUsuario: input.nomeUsuario,
          senha: input.senha,
          tipoUsuario: input.tipoUsuario,
        }),
      );

      if (input.tipoUsuario === "aluno") {
        await manager.save(
          Aluno,
          manager.create(Aluno, {
            emailEscola: input.emailEscola,
            tipoUsuario: "aluno",
            nomeTurma: input.nomeTurma ?? null,
            numChamada: input.numChamada ?? null,
            idDirecao: input.idDirecao ?? null,
          }),
        );
      }

      if (input.tipoUsuario === "professor") {
        await manager.save(
          Professor,
          manager.create(Professor, {
            emailEscola: input.emailEscola,
            tipoUsuario: "professor",
            nomeTurma: input.nomeTurma ?? null,
            materia: input.materia ?? null,
          }),
        );
      }

      if (input.tipoUsuario === "direcao") {
        await manager.save(
          Direcao,
          manager.create(Direcao, {
            emailEscola: input.emailEscola,
            tipoUsuario: "direcao",
          }),
        );
      }

      return savedUser;
    });
  }

  async update(emailEscola: string, input: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOneBy({ emailEscola });

    if (!user) {
      throw new NotFoundException("Usuario nao encontrado.");
    }

    if (input.tipoUsuario && input.tipoUsuario !== user.tipoUsuario) {
      throw new BadRequestException(
        "Para trocar o tipo do usuario, remova e cadastre novamente.",
      );
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.update(User, emailEscola, {
        nomeUsuario: input.nomeUsuario ?? user.nomeUsuario,
        senha: input.senha ?? user.senha,
      });

      if (user.tipoUsuario === "aluno") {
        await manager.update(Aluno, emailEscola, {
          nomeTurma: input.nomeTurma,
          numChamada: input.numChamada,
          idDirecao: input.idDirecao,
        });
      }

      if (user.tipoUsuario === "professor") {
        await manager.update(Professor, emailEscola, {
          nomeTurma: input.nomeTurma,
          materia: input.materia,
        });
      }
    });

    const updatedUser = await this.usersRepository.findOneBy({ emailEscola });

    if (!updatedUser) {
      throw new NotFoundException("Usuario nao encontrado.");
    }

    return updatedUser;
  }

  async login(input: LoginInput): Promise<User> {
    this.validateSchoolEmail(input.emailEscola);

    const user = await this.usersRepository.findOneBy({
      emailEscola: input.emailEscola,
    });

    if (!user || user.senha !== input.senha) {
      throw new UnauthorizedException("E-mail ou senha invalidos.");
    }

    return user;
  }

  async resetPassword(emailEscola: string, senha: string): Promise<User> {
    this.validateSchoolEmail(emailEscola);

    const user = await this.usersRepository.findOneBy({ emailEscola });

    if (!user) {
      throw new NotFoundException("Usuario nao encontrado.");
    }

    user.senha = senha;
    return this.usersRepository.save(user);
  }

  async requestPasswordRecovery(emailEscola: string): Promise<{ message: string }> {
    this.validateSchoolEmail(emailEscola);

    const user = await this.usersRepository.findOneBy({ emailEscola });

    if (!user) {
      throw new NotFoundException("Usuario nao encontrado.");
    }

    const code = this.generateRecoveryCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    this.passwordRecoveryCodes.set(emailEscola, { code, expiresAt });
    await this.sendRecoveryCode(emailEscola, code);

    return {
      message: "Codigo de confirmacao enviado.",
    };
  }

  async confirmPasswordRecovery(
    emailEscola: string,
    code: string,
    senha: string,
  ): Promise<User> {
    this.validateSchoolEmail(emailEscola);

    const recoveryCode = this.passwordRecoveryCodes.get(emailEscola);

    if (!recoveryCode) {
      throw new BadRequestException("Solicite um novo codigo de confirmacao.");
    }

    if (recoveryCode.expiresAt.getTime() < Date.now()) {
      this.passwordRecoveryCodes.delete(emailEscola);
      throw new BadRequestException("Codigo de confirmacao expirado.");
    }

    if (recoveryCode.code !== code) {
      throw new BadRequestException("Codigo de confirmacao invalido.");
    }

    this.passwordRecoveryCodes.delete(emailEscola);
    return this.resetPassword(emailEscola, senha);
  }

  async remove(emailEscola: string): Promise<void> {
    await this.usersRepository.delete(emailEscola);
  }

  private generateRecoveryCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async mergeProfile(user: User): Promise<UserProfile> {
    if (user.tipoUsuario === "aluno") {
      const aluno = await this.dataSource
        .getRepository(Aluno)
        .findOneBy({ emailEscola: user.emailEscola });

      return {
        ...user,
        nomeTurma: aluno?.nomeTurma ?? null,
        numChamada: aluno?.numChamada ?? null,
        idDirecao: aluno?.idDirecao ?? null,
      };
    }

    if (user.tipoUsuario === "professor") {
      const professor = await this.dataSource
        .getRepository(Professor)
        .findOneBy({ emailEscola: user.emailEscola });

      return {
        ...user,
        nomeTurma: professor?.nomeTurma ?? null,
        materia: professor?.materia ?? null,
      };
    }

    return user;
  }

  private validateSchoolEmail(emailEscola: string): void {
    const schoolEmailPattern = /^[^\s@]+@escola\.[a-z]{2}\.gov\.br$/i;

    if (!schoolEmailPattern.test(emailEscola)) {
      throw new BadRequestException(
        "Use um e-mail escolar no formato usuario@escola.uf.gov.br.",
      );
    }
  }

  private async sendRecoveryCode(emailEscola: string, code: string): Promise<void> {
    console.log(`Codigo de recuperacao para ${emailEscola}: ${code}`);
  }
}
