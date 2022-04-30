import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Category } from "./category.entity";
import { Content } from "./content.entity";

@Entity()
// export class Question extends Content {}
export class Question {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  answersCount: number;

  /*
  * Question can have multiple Category(s)/ Category[] and single category can have multiple Question(s)
  * */

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];

}