import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("emprestimo_aluno")
export class EmprestimoAluno {
  @PrimaryGeneratedColumn({ name: "id_EA", type: "int" })
  idEA: number;

  @Column({ name: "data_emprestimo", type: "timestamp", nullable: true })
  dataEmprestimo: Date | null;

  @Column({ name: "email_escola", type: "varchar", length: 70 })
  emailEscola: string;

  @Column({ name: "id_itens", type: "int" })
  idItens: number;
}
