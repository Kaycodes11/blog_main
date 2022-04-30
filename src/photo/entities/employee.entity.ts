import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  salary: string;
}

@Entity('students')
export  class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(type => Name)
  name: Name; // now it would be saved to database as nameFirst and nameLast

  @Column()
  faculty: string;
}

export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}
