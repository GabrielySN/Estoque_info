import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("direcao")
export class Direcao {
  @PrimaryGeneratedColumn({ name: "id_direcao", type: "int" })
  idDirecao: number;

  @Column({ name: "email_escola", type: "varchar", length: 70, unique: true })
  emailEscola: string;

  @Column({
    name: "tipo_usuario",
    type: "enum",
    enum: ["direcao"],
    default: "direcao",
  })
  tipoUsuario: "direcao";
}
