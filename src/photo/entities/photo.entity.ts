import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  url: string;

  @Column()
  title: string;

  @Column({ length: 150 })
  description: string;

  @Column()
  size: string;

  /*
   * Basically, User can have multiple Photo[]/Photos but each Photo is owned by  only one Single User
   * */

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;
}

/*
## Example how to save such relation:

const photo1 = new Photo();
photo1.url = "me.jpg";
await connection.manager.save(photo1);

const photo2 = new Photo();
photo2.url = "me-and-bears.jpg";
await connection.manager.save(photo2);

const user = new User();
user.name = "John";
user.photos = [photo1, photo2];
await connection.manager.save(user);


-------------------
const user = new User();
user.name = "Leo";
await connection.manager.save(user);

const photo1 = new Photo();
photo1.url = "me.jpg";
photo1.user = user;
await connection.manager.save(photo1);

const photo2 = new Photo();
photo2.url = "me-and-bears.jpg";
photo2.user = user;
await connection.manager.save(photo2);

## load
const userRepository = connection.getRepository(User);
const users = await userRepository.find({ relations: ["photos"] });

// or from inverse side

const photoRepository = connection.getRepository(Photo);
const photos = await photoRepository.find({ relations: ["user"] });


const users = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.photos", "photo")
    .getMany();

// or from inverse side

const photos = await connection
    .getRepository(Photo)
    .createQueryBuilder("photo")
    .leftJoinAndSelect("photo.user", "user")
    .getMany();

NOTE:: With eager loading enabled on a relation no need to specify relation or join it;
- as it will ALWAYS be loaded automatically.

* */
