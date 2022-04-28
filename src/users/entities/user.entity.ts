import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('int', { nullable: true })
  age: number;

  // @Column('simple-array')
  // address: string[];

  // @Column('simple-json')
  // info: { firstName: string, lastName: string, fullName: string, mobile: string };

  // @Column(default: () => 'male')
  // gender: string;
}

// export class Result extends User {
//   @Column()
//   eligible:string;
// }
