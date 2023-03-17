import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly autoService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      //Hasheo la password
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hash;
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return this.autoService.login(user);
    } catch (error) {
      this.handleExcepcion(error);
    }
  }

  findAll() {
    return this.userRepository.find({});
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleExcepcion(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check your logs');
  }
}
