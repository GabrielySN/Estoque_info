import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("direcao")
export class Direcao {
  @PrimaryColumn({ name: "email_escola", type: "varchar", length: 70 })
  emailEscola: string;

  @Column({ type: "varchar", length: 255 })
  senha: string;
}
