import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @Column({ default: 'male' })
  gender: string;

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
