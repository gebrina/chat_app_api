import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
}
