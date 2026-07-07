import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type ItemStatus = "disponivel" | "manutencao" | "indisponivel";

@Entity("itens")
export class Item {
  @PrimaryGeneratedColumn({ name: "id_itens", type: "int" })
  idItens: number;

  @Column({ name: "nome_item", type: "varchar", length: 30 })
  nomeItem: string;

  @Column({ name: "modelo_item", type: "varchar", length: 20, nullable: true })
  modeloItem: string | null;

  @Column({ name: "qtd_item", type: "int", default: 0 })
  qtdItem: number;

  @Column({
    name: "status_item",
    type: "enum",
    enum: ["disponivel", "manutencao", "indisponivel"],
  })
  statusItem: ItemStatus;

  @Column({ name: "id_categoria", type: "int", nullable: true })
  idCategoria: number | null;
}
