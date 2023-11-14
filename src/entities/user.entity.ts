import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn({ default: Date.now() })
  createdAt: Date;

  @Column()
  password: string;
}
