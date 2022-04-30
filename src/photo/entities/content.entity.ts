import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Content {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  title: string;

  @Column()
  description: string;
}