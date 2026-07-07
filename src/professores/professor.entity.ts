import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("professor")
export class Professor {
  @PrimaryColumn({ name: "email_escola", type: "varchar", length: 70 })
  emailEscola: string;

  @Column({
    name: "tipo_usuario",
    type: "enum",
    enum: ["professor"],
    default: "professor",
  })
  tipoUsuario: "professor";

  @Column({ name: "nome_turma", type: "varchar", length: 10, nullable: true })
  nomeTurma: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  materia: string | null;
}
