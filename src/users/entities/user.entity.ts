import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Photo } from 'src/photo/entities/photo.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, nullable: true })
  // @Length(10, 100)
  firstName: string;

  @Column('varchar', { length: 100, nullable: true })
  surName: string;

  @Column('varchar')
  // @IsEmail()
  email: string;

  @Column('text')
  password: string;

  @Column('int', { nullable: false })
  age: number;

  // @Column('simple-array')
  // address: string[];

  // @Column('simple-json')
  // info: { firstName: string, lastName: string, fullName: string, mobile: string };

  /*
   * Here A/User has multiple instance of B/Photos thus oneToMany relation
   * Basically, One User's instance can have multiple Photo's instances
   * JoinColumn can be omitted with OneToMany/ManyToOne relation
   * OneToMany/ManyToOne relation, foreign key placed on @ManyToOne i.e. Photo entity
   * */

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];

  // when getting User not including Profile but still need like profileId
  // then just make same named property that's same as the column created by relation like here Profile + id = "profileId"
  @Column({ nullable: true })
  profileId: string;

  // as known this will generate Profile + id = profileId foreign key and since JoinColumn mentioned that means
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @Column({ default: 'male' })
  gender: string;

  // @BeforeInsert()
  // async hashPassword() {
  //   const salt = await  genSalt(10);
  //   this.password = await hash(this.password, salt);
  // }

  @CreateDateColumn({ name: 'created_at', default: () => 'current_timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'current_timestamp' })
  updated_at: Date;
}

// this will all the props and their metadata decorators
// export class Result extends User {
//   @Column()
//   eligible:string;
// }

/*
* Example on saving a user with profile
* const profile = new Profile();
profile.gender = "male";
profile.photo = "me.jpg";
await connection.manager.save(profile);

const user = new User();
user.name = 'Joe Smith';
user.profile = profile;
await connection.manager.save(user);
*
*
* To load user with profile inside you must specify relation in FindOptions:

const userRepository = connection.getRepository(User);
const users = await userRepository.find({ relations: ["profile"] });
* # OR using the queryBuilder
* const users = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.profile", "profile")
    .getMany();
    *
#### How to load relations in entities
The easiest way to load your entity relations is to use relations option in FindOptions:

const users = await connection.getRepository(User).find({ relations: ["profile", "photos", "videos"] });

* ## Alternative and more flexible way is to use QueryBuilder:

const user = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.profile", "profile")
    .leftJoinAndSelect("user.photos", "photo")
    .leftJoinAndSelect("user.videos", "video")
    .getMany();
*  */
