import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
  USER = 'User',
  EDITOR = 'Editor',
  GUEST = 'Guest',
  ADMIN = 'Admin',
  SUPERADMIN = 'SUPERADMIN',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.GUEST })
  title: UserRoles;
}
