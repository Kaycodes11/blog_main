import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cats')
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('integer')
  age: number;

  @Column('varchar')
  breed: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'current_timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'current_timestamp' })
  updated_at: Date;
}
