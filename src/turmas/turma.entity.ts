import { Column, Entity, PrimaryColumn } from "typeorm";

export type TurmaPeriodo = "matutino" | "vespertino" | "noturno";

@Entity("turma")
export class Turma {
  @PrimaryColumn({ name: "nome_turma", type: "varchar", length: 10 })
  nomeTurma: string;

  @Column({
    name: "periodo",
    type: "enum",
    enum: ["matutino", "vespertino", "noturno"],
  })
  periodo: TurmaPeriodo;
}
