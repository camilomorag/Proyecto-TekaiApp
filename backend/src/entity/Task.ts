import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  titulo!: string;

  @Column("text")
  descripcion!: string;

  @Column({
    type: "enum",
    enum: ["Creada", "En progreso", "Bloqueada", "Finalizada", "Cancelada"],
    default: "Creada"
  })
  estado!: string;

  @Column({ length: 100 })
  responsable!: string;

  @CreateDateColumn({ name: "fecha_creacion" })
  fechaCreacion!: Date;
}