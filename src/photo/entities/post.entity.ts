import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Category } from "./category.entity";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name:string;

  @Column()
  description: string;

  @Column()
  viewCount: number;

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

  @ManyToMany(type => Category)
  @JoinTable({
    name: "question_categories", // table name for the junction table of this relation
    joinColumn: {
      name: "question",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "category",
      referencedColumnName: "id"
    }
  })
  categories: Category[];

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
//
// }