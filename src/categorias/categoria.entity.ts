import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn({ name: "id_categoria", type: "int" })
  idCategoria: number;

  @Column({ name: "nome_categoria", type: "varchar", length: 40 })
  nomeCategoria: string;
}
