import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user';
import { UserFactory } from '../factories/user-factory';
import { DuplicateEmailException } from '../exceptions/DuplicateEmailException';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { EntityToDtoMapper } from '../util/mapper';

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async create(name: string, email: string): Promise<UserResponseDto> {
    const existing: User | null = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new DuplicateEmailException(email);
    }

    const userToSave = UserFactory.create(name, email);
    const user = await this.userRepo.create(userToSave.name, userToSave.email);

    return EntityToDtoMapper.toUserDto(user);
  }

  async getById(id: string): Promise<UserResponseDto> {
    const user: User | null = await this.userRepo.findById(id);
    if (!user) throw new UserNotFoundException(id);

    return EntityToDtoMapper.toUserDto(user);
  }

  async getByEmail(id: string): Promise<UserResponseDto> {
    const user: User | null = await this.userRepo.findByEmail(id);
    if (!user) throw new UserNotFoundException(id);

    return EntityToDtoMapper.toUserDto(user);
  }
}
