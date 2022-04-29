import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne((type) => Category)
  // category: Category;
  //
  // @RelationId((post: Post) => post.category) // you need to specify target relation
  // categoryId: number;

  @ManyToMany((type) => Category)
  categories: Category[];

  @RelationId((post: Post) => post.categories)
  categoryIds: number[]
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