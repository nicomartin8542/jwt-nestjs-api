import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  //Inyectamos el servicio del modulo de users
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && pass === user.password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const { username, userId } = user;
    const payload = { username, sub: userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
