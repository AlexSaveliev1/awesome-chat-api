import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';

import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class RoomRepository {
  private readonly repository: Repository<Room> = getRepository(Room);

  public createAndSave(participants: User[]): Promise<Room> {
    return this.repository.save({ participants });
  }

  public async findByUserId(id: number): Promise<Room[]> {
    // TODO: Refactor to join-query
    const allRooms: Room[] = await this.repository.find({ relations: ['participants', 'messages']});

    return allRooms.filter(room => room.participants.some(participant => participant.id === id));
  }

  public findById(id: number): Promise<Room> {
    return this.repository.findOne(id);
  }
}