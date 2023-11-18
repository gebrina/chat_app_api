import { Chat } from 'src/entities/chat.entity';
import { User } from 'src/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => User, (user) => user.rooms)
  users: User;

  @OneToMany(() => Chat, (chat) => chat.room)
  chats: Chat[];
}
