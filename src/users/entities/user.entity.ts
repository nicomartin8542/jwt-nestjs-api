import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  username: string;

  @Column('text', {
    nullable: false,
  })
  password: string;

  @Column('text', {
    array: true,
    nullable: false,
  })
  roles: string[];
}
