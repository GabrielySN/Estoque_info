import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("professor")
export class Professor {
  @PrimaryColumn({ name: "email_escola", type: "varchar", length: 70 })
  emailEscola: string;

  @Column({ name: "nome_turma", type: "varchar", length: 10 })
  nomeTurma: string;

  @Column({ type: "varchar", length: 255 })
  senha: string;

  @Column({ type: "varchar", length: 30 })
  materia: string;
}
