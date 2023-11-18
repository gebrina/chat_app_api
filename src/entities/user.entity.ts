import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Chat } from './chat.entity';
import { Room } from 'src/entities/room.entity';

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

  @OneToMany(() => Chat, (chat) => chat.user, { eager: true })
  chats: Chat[];

  @ManyToMany(() => Room, (room) => room.users, { eager: true })
  rooms: Room[];
}
