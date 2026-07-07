import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type ItemStatus =
  | "Disponível"
  | "Em manutenção"
  | "Sem conserto"
  | "Emprestado";

@Entity("itens")
export class Item {
  @PrimaryGeneratedColumn({ name: "id_itens", type: "int" })
  idItens: number;

  @Column({ name: "nome_item", type: "varchar", length: 30 })
  nomeItem: string;

  @Column({ name: "modelo_item", type: "varchar", length: 20 })
  modeloItem: string;

  @Column({ name: "qtd_item", type: "int", default: 0 })
  qtdItem: number;

  @Column({
    name: "status_item",
    type: "enum",
    enum: ["Disponível", "Em manutenção", "Sem conserto", "Emprestado"],
    default: "Disponível",
  })
  statusItem: ItemStatus;

  @Column({ name: "id_categoria", type: "int" })
  idCategoria: number;
}
