import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Question {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  /*
  * Question can have multiple Category(s)/ Category[] and single category can have multiple Question(s)
  * */

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];

}