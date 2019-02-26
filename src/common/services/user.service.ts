import { ConflictException, Injectable } from '@nestjs/common';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { FindConditions } from 'typeorm';

import { CreateUserDto } from '../../modules/auth/dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { PasswordHashService } from './password-hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findByEmailOrUsername(createUserDto.email, createUserDto.username);

    if (user) {
      const conflictSubject = user.email === createUserDto.email ? 'Email' : 'Username';

      throw new ConflictException(`${conflictSubject} is already in use`);
    }

    createUserDto.password = await this.passwordHashService.hash(createUserDto.password);
    createUserDto.email = createUserDto.email.toLowerCase();

    return this.userRepository.createAndSave(createUserDto);
  }

  public findUser(conditions: FindConditions<User>, fieldsToBeSelected: string[] = []): Promise<User> {
    const options = isEmpty(fieldsToBeSelected) ? {} : { select: fieldsToBeSelected };

    return this.userRepository.findOne(conditions, options);
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public findByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.findByIds(ids);
  }
}
