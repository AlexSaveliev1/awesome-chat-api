import { Injectable } from '@nestjs/common';

import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import { RoomRepository } from '../repositories';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository
  ) {}

  public async createAndSave(participants: User[]): Promise<Room> {
    return this.roomRepository.createAndSave(participants);
  }
}
