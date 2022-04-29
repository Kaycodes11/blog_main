import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Category {

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
  questions: Question[];

}