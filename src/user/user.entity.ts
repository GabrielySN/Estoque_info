import { Column, Entity, PrimaryColumn } from "typeorm";

export type UserType = "direcao" | "professor" | "aluno";

@Entity("usuarios")
export class User {
  @PrimaryColumn({ name: "email_escola", type: "varchar", length: 70 })
  emailEscola: string;

  @Column({ name: "nome_usuario", type: "varchar", length: 50 })
  nomeUsuario: string;

  @Column({ name: "senha", type: "varchar", length: 255 })
  senha: string;

  @Column({
    name: "tipo_usuario",
    type: "enum",
    enum: ["direcao", "professor", "aluno"],
  })
  tipoUsuario: UserType;
}
