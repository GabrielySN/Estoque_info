import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("aluno")
export class Aluno {
  @PrimaryColumn({ name: "email_escola", type: "varchar", length: 70 })
  emailEscola: string;

  @Column({
    name: "nome_usuario",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  nomeUsuario: string | null;

  @Column({ name: "nome_turma", type: "varchar", length: 10 })
  nomeTurma: string;

  @Column({ name: "num_chamada", type: "int" })
  numChamada: number;

  @Column({ type: "varchar", length: 255 })
  senha: string;
}
