// import { Category } from "../../photo/entities/category.entity";
// import { ViewEntity } from "typeorm";
//
// @ViewEntity({
//   expression: (connection: Connection) => connection.createQueryBuilder()
//     .select("post.id", "id")
//     .addSelect("post.name", "name")
//     .addSelect("category.name", "categoryName")
//     .from(Post, "post")
//     .leftJoin(Category, "category", "category.id = post.categoryId")
//     .where("category.name = 'Cars'")
// })

// now import this within entities array on app.module or register within forFeature on its own module to use it