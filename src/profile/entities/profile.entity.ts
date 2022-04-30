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