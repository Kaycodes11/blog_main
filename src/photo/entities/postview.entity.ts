import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Post } from "./post.entity";
import { Category } from "./category.entity";

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("post.id", "id")
    .addSelect("post.name", "name")
    .from(Post, "post").leftJoin(Category, "category", "category.id = post.categoryId")
})

export class PostCategory {
  @ViewColumn()
  id: string;

  @ViewColumn()
  name:string;

  @ViewColumn()
  categoryName: string;
}


/*
*
import {getManager} from "typeorm";
import {Category} from "./entity/Category";
import {Post} from "./entity/Post";
import {PostCategory} from "./entity/PostCategory";

const entityManager = getManager();

const category1 = new Category();
category1.name = "Cars";
await entityManager.save(category1);

const category2 = new Category();
category2.name = "Airplanes";
await entityManager.save(category2);

const post1 = new Post();
post1.name = "About BMW";
post1.categoryId = category1.id;
await entityManager.save(post1);

const post2 = new Post();
post2.name = "About Boeing";
post2.categoryId = category2.id;
await entityManager.save(post2);

const postCategories = await entityManager.find(PostCategory);
const postCategory = await entityManager.findOne(PostCategory, { id: 1 });
the result in postCategories will be:

# PostCategories Response will be
* [ PostCategory { id: 1, name: 'About BMW', categoryName: 'Cars' },
  PostCategory { id: 2, name: 'About Boeing', categoryName: 'Airplanes' } ]
and in postCategory:

* PostCategory response will be::
PostCategory { id: 1, name: 'About BMW', categoryName: 'Cars' }
* */
