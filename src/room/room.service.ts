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

  counter = 0;
  async create(room: Room) {
    const foundRoom = await this.findRoomByName(room.name);
    if (foundRoom) return;
    this.counter++;
    if (this.counter === 1) {
      return await this.roomRepo.save(room);
    }
  }

  async update(room: Room, id: string) {
    let savedRoom = await this.findOne(id);
    if (!savedRoom) return;
    savedRoom = room;
    return await this.roomRepo.save(savedRoom);
  }

  async findOne(id: string): Promise<Room> {
    return await this.roomRepo.findOneBy({ id });
  }
}
