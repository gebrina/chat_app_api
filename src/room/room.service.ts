import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) {}

  async find(): Promise<Room[]> {
    return await this.roomRepo.find();
  }

  async findRoomByName(name: string): Promise<Room> {
    return await this.roomRepo.findOneBy({ name });
  }

  async create(room: Room) {
    const foundRoom = this.findRoomByName(room.name);
    if (foundRoom) return;
    return await this.roomRepo.save(room);
  }
}
