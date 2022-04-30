import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';
import { Content } from './content.entity';

@Entity()
// export class Question extends Content { now just add the necessary properties }
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  answersCount: number;

  /*
   * Question can have multiple Category(s)/ Category[] and single category can have multiple Question(s)
   * */

  @ManyToMany((type) => Category, (category) => category.questions, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];


}

/*
* const category1 = new Category();
category1.name = "animals";

const category2 = new Category();
category2.name = "zoo";

const question = new Question();
question.categories = [category1, category2];
await connection.manager.save(question);
*
* due to cascade to save can be called just once
* */
