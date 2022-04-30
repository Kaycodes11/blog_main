import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Post } from "./post.entity";

@Entity()
export class PostToCategory {
  @PrimaryGeneratedColumn('uuid')
  public postToCategoryId!: string;

  @Column()
  public postId!: number;

  @Column()
  public categoryId!: number;

  @Column()
  public order!: number;

  @ManyToOne(() => Post, post => post.postToCategories)
  public post!: Post;

  @ManyToOne(() => Category, category => category.postToCategories)
  public category!: Category;
}