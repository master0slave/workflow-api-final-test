import { Injectable } from '@nestjs/common';
import { LoggedInDto } from 'src/auth/dto/logged-in.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private JwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<LoggedInDto> {
    // find user by username
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      console.log(`user not found: username=${username}`);
      return null;
    }

    // found & compare password
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      console.log(`password not match: username=${username}`);
      return null;
    }
  }

  login(loggedInDto:LoggedInDto):string {
    const payload: LoggedInDto = {...loggedInDto, sub: loggedInDto.id};
    return this.JwtService.sign(payload);
  }
}
