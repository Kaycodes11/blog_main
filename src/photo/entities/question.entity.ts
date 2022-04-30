import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';

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
   * JoinTable is required for ManyToMany, must use that on one (owning) side of relation,
   * that's all need to make a junction table if no need add any extra custom properties to junction table
   * */

  @ManyToMany(() => Category, (category) => category.questions, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  // @ManyToMany(() => Category, (category) => category.questions, {
  //   cascade: true,
  // })
  // @JoinTable()
  // categories: Promise<Category[]>;
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
*
* ## Saving many-to-many relations
const category1 = new Category();
category1.name = "animals";
await connection.manager.save(category1);

const category2 = new Category();
category2.name = "zoo";
await connection.manager.save(category2);

const question = new Question();
question.title = "dogs";
question.text = "who let the dogs out?";
question.categories = [category1, category2];
await connection.manager.save(question);

* #### Deleting many-to-many relations
With cascades enabled, you can delete this relation with only one save call.

To delete a many-to-many relationship between two records, remove it from the corresponding field and save the record.

const question = getRepository(Question);
question.categories = question.categories.filter(category => {
    category.id !== categoryToRemove.id
})
await connection.manager.save(question)
*
* #### Soft Deleting a relationship with cascade
This example shows how the cascading soft delete behaves:

const category1 = new Category();
category1.name = "animals";

const category2 = new Category();
category2.name = "zoo";

const question = new Question();
question.categories = [category1, category2];
const newQuestion =  await connection.manager.save(question);

await connection.manager.softRemove(newQuestion);
*
* In this example we did not call save or softRemove for category1 and category2, but they will be automatically saved and soft-deleted when the cascade of relation options is set to true like this:
*
*
* Loading many-to-many relations
To load questions with categories inside you must specify the relation in FindOptions:

const questionRepository = connection.getRepository(Question);
const questions = await questionRepository.find({ relations: ["categories"] });
*
* const questions = await connection
    .getRepository(Question)
    .createQueryBuilder("question")
    .leftJoinAndSelect("question.categories", "category")
    .getMany()
    
#### Bi-directional relations allow you to join relations from both sides using QueryBuilder:
const categoriesWithQuestions = await connection
    .getRepository(Category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.questions", "question")
    .getMany();
    *
    *
#### Example how to save a lazy loaded entity basically when joined table has Promise<>
* const category1 = new Category();
category1.name = "animals";
await connection.manager.save(category1);

const category2 = new Category();
category2.name = "zoo";
await connection.manager.save(category2);

const question = new Question();
question.categories = Promise.resolve([category1, category2]);
await connection.manager.save(question);
*
*
*#### Example how to load objects inside lazy relations:

const question = await connection.getRepository(Question).findOne(1);
const categories = await question.categories; // you'll have all question's categories inside "categories" variable now
 */
