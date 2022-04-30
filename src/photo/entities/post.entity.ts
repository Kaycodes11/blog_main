import {
  AfterInsert, BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import { Category } from "./category.entity";
import { JoinColumn } from "typeorm/browser";
import { PostToCategory } from "./postToCategory.entity";
import { Contains, IsFQDN, IsInt, Length, Max, Min } from "class-validator";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  // @Length(10, 20)
  title: string;

  @Column()
  // @Contains("Hello")
  text: string;

  @Column()
  // @IsFQDN()
  site: string;

  @Column()
  // @IsInt()
  // @Min(0)
  // @Max(10)
  rating: number;

  @Column()
  description: string;

  @Column()
  viewCount: number;

  @OneToMany(() => PostToCategory, postToCategory => postToCategory.post)
  public postToCategories!: PostToCategory[];

  // @AfterInsert()
  // resetRating() {
  //   this.rating = 0
  // }

  // @BeforeUpdate()
  // updateDates() {
  //   this.updated_at = new Date()
  // }

  // @ManyToOne(type => Category)
  // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  // category: Category;
  // This code will create a categoryId column in the database. If you want to change this name in the database you can specify a custom join column name:

  // @ManyToOne(type => Category)
  // @JoinColumn({ name: "cat_id" })
  // category: Category;

  // Here , foreign key will be ModelName = Category + reference column name i.e. name = "categoryName"
  // @ManyToOne(type => Category)
  // @JoinColumn({ referencedColumnName: "name" })
  // category: Category;

  // @ManyToOne(type => Category)
  // @JoinColumn([
  //   { name: "category_id", referencedColumnName: "id" },
  //   { name: "locale_id", referencedColumnName: "locale_id" }
  // ])
  // category: Category;

  // @ManyToMany(type => Category)
  // @JoinTable({
  //   name: "question_categories", // table name for the junction table of this relation
  //   joinColumn: {
  //     name: "question",
  //     referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //     name: "category",
  //     referencedColumnName: "id"
  //   }
  // })
  // categories: Category[];

  // @ManyToOne((type) => Category)
  // @JoinColumn({name: "categoryId"})
  // category: Category;
  //
  // @RelationId((post: Post) => post.category) // you need to specify target relation
  // categoryId: number;

  // @ManyToMany((type) => Category)
  // categories: Category[];
  //
  // @RelationId((post: Post) => post.categories)
  // categoryIds: number[]
}


// @Entity()
// export class Post {
//
//   @ManyToMany(type => Category)
//   categories: Category[];
//
//   @RelationId((post: Post) => post.categories)
//   categoryIds: number[];
//
// }


// @Entity()
// export class Post {
//
//   @ManyToOne(type => Category)
//   @JoinColumn({
//     name: "cat_id",
//     referencedColumnName: "name"
//   })
//   category: Category;
//
// }

// @Entity()
// export class Post {
//
//   @ManyToMany(type => Category)
//   @JoinTable({
//     name: "question_categories",
//     joinColumn: {
//       name: "question",
//       referencedColumnName: "id"
//     },
//     inverseJoinColumn: {
//       name: "category",
//       referencedColumnName: "id"
//     }
//   })
//   categories: Category[];
// }

/*
* #### validation by entity without dto
* import {getManager} from "typeorm";
import {validate} from "class-validator";

let post = new Post();
post.title = "Hello"; // should not pass
post.text = "this is a great post about hell world"; // should not pass
post.rating = 11; // should not pass
post.email = "google.com"; // should not pass
post.site = "googlecom"; // should not pass

const errors = await validate(post);
if (errors.length > 0) {
    throw new Error(`Validation failed!`);
} else {
    await getManager().save(post);
}
*
* */