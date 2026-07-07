import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("aluno")
export class Aluno {
  @PrimaryColumn({ name: "email_escola", type: "varchar", length: 70 })
  emailEscola: string;

  @Column({
    name: "tipo_usuario",
    type: "enum",
    enum: ["aluno"],
    default: "aluno",
  })
  tipoUsuario: "aluno";

  @Column({ name: "nome_turma", type: "varchar", length: 10, nullable: true })
  nomeTurma: string | null;

  @Column({ name: "num_chamada", type: "int", nullable: true })
  numChamada: number | null;

  @Column({ name: "id_direcao", type: "int", nullable: true })
  idDirecao: number | null;
}
