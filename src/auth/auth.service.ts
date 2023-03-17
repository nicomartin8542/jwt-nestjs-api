import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //Inyectamos el servicio del modulo de users
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) return user;
    return null;
  }

  async login(user: User) {
    const { username, id, roles } = user;
    const payload = { username, sub: id, roles };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
