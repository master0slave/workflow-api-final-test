import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
  ) {}
  async create(createUserDto: CreateUserDto) {

    // gen salt
    const salt = await bcrypt.genSalt();

    // enc password
    const encPassword = await bcrypt.hash(createUserDto.password, salt)

    // replace password with encPassword
    const userWithEncPassword = {...createUserDto, password: encPassword };

    // saved
    const savedUser = await this.userRepository.save(userWithEncPassword);

    // spread password filed from savedUser
    const { password, ...userWithoutPassword } = savedUser;

    // return user without password filed
    return userWithoutPassword;

  }

  async findOneByUsername(username: string): Promise<Users> {
    if (!username) {
      return null
    }
    return this.userRepository.findOneBy({ username });
  }
}