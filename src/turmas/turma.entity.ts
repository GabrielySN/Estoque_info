import { Column, Entity, PrimaryColumn } from "typeorm";

export type TurmaPeriodo = "Manhã" | "Tarde" | "Noite";

@Entity("turma")
export class Turma {
  @PrimaryColumn({ name: "nome_turma", type: "varchar", length: 10 })
  nomeTurma: string;

  @Column({ name: "periodo", type: "enum", enum: ["Manhã", "Tarde", "Noite"] })
  periodo: TurmaPeriodo;
}
