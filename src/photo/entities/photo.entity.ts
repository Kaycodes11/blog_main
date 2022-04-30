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
  size:string;

  /*
   * Basically, User can have multiple Photo[]/Photos but each Photo is owned by  only one Single User
   * */

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;
}
