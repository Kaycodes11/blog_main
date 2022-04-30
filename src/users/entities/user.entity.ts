import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { genSalt, hash } from "bcrypt";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Photo } from 'src/photo/entities/photo.entity';
import { Profile } from "../../profile/entities/profile.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, nullable: true })
  firstName: string;

  @Column('varchar', { length: 100, nullable: true })
  surName: string;

  @Column('varchar')
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
  * Basically, User can have multiple Photo[] but each Photo is owned by  only one Single User
  * */

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];

  // as known this will generate Profile + id = profileId foreign key and since JoinColumn mentioned that means
  // foreign key placed on this entity on this one-to-one relationship
  @OneToOne(() => Profile)
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
*  */