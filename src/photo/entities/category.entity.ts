import {
  Entity,
  PrimaryGeneratedColumn,
  Column, ManyToMany, OneToMany
} from "typeorm";
import { Question } from './question.entity';
import { PostToCategory } from "./postToCategory.entity";
import { PostCategory } from "./postview.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @Column()
  // description: string;

  // eager loading: will  include joined entities by default  when using find methods
  @ManyToMany(type => Question, question => question.categories)
  questions: Question[];

  // lazy loading: will not include joined entities unless mentioned when using find methods
  // @ManyToMany(type => Question, question => question.categories)
  // questions: Promise<Question[]>;

  @OneToMany(() => PostToCategory, postToCategory => postToCategory.category)
  public postToCategories!: PostCategory[];


  // @ManyToOne(type => Category, category => category.childCategories)
  // parentCategory: Category;
  //
  // @OneToMany(type => Category, category => category.parentCategory)
  // childCategories: Category[];


  /*
   * Question can have multiple Category(s)/ Category[] and single category can have multiple Question(s)
   * */

  // @ManyToMany((type) => Category)
  // @JoinTable()
  // questions: Question[];

  // Adjacency List : self referencing
  // @ManyToOne(type => Category, category => category.children)
  // parent: Category;
  //
  // @ManyToOne(type => Category, category => category.parent)
  // children: Category[]

  // Closure Table
  // @TreeChildren()
  // children: Category[];
  //
  // @TreeParent()
  // parent: Category;
}

/*
const manager = getManager();
const a1 = new Category("a1");
a1.name = "a1";
await manager.save(a1);

const a11 = new Category();
a11.name = "a11";
a11.parent = a1;
await manager.save(a11);

const a12 = new Category();
a12.name = "a12";
a12.parent = a1;
await manager.save(a12);

const a111 = new Category();
a111.name = "a111";
a111.parent = a11;
await manager.save(a111);

const a112 = new Category();
a112.name = "a112";
a112.parent = a11;
await manager.save(a112);

# To load  such a tree ::
const manager = getManager();
const trees = await manager.getTreeRepository(Category).findTrees();

# Response example ::
[{
    "id": 1,
    "name": "a1",
    "children": [{
        "id": 2,
        "name": "a11",
        "children": [{
            "id": 4,
            "name": "a111"
        }, {
            "id": 5,
            "name": "a112"
        }]
    }, {
        "id": 3,
        "name": "a12"
    }]
}]

# findTrees: returns all trees from database with all of their children, children of children etc.
await repository.findTrees();

# findRoots : Roots are the entities that have no ancestors , find all don't include children
const rootCategories = await repository.findRoots();

# findDescendants: Gets all children (descendants) of the given entity, return them within a flat array
const children = await repository.findDescendants(parentCategory);

# findDescendantsTree - Gets all children (descendants) of the given entity. Returns them in a tree - nested into each other.
const childrenTree = await repository.findDescendantsTree(parentCategory);
// returns all direct subcategories (with its nested categories) of a parentCategory

# createDescendantsQueryBuilder - Creates a query builder used to get descendants of the entities in a tree.
const children = await repository
    .createDescendantsQueryBuilder("category", "categoryClosure", parentCategory)
    .andWhere("category.type = 'secondary'")
    .getMany();

# countDescendants - Gets number of descendants of the entity.
const childrenCount = await repository.countDescendants(parentCategory);

findAncestors - Gets all parent (ancestors) of the given entity. Returns them all in a flat array.
const parents = await repository.findAncestors(childCategory);
// returns all direct childCategory's parent categories (without "parent of parents")


# createAncestorsQueryBuilder - Creates a query builder used to get ancestors of the entities in a tree.
const parents = await repository
    .createAncestorsQueryBuilder("category", "categoryClosure", childCategory)
    .andWhere("category.type = 'secondary'")
    .getMany();
# countAncestors - Gets the number of ancestors of the entity.
const parentsCount = await repository.countAncestors(childCategory);

 */
