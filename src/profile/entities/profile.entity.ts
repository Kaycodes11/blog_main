import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('profiles')
export class Profile {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  photo: string;

  @OneToOne(() => User, user => user.profile)
  user: User;

}

/*
# Bi-directional relations allow you to join relations from both sides using QueryBuilder:

const profiles = await connection
    .getRepository(Profile)
    .createQueryBuilder("profile")
    .leftJoinAndSelect("profile.user", "user")
    .getMany();
* */