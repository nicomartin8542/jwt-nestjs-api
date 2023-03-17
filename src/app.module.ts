import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesAuthGuards } from './auth/guards/roles-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Configuration } from './config/configuration';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesAuthGuards,
    },
  ],
  imports: [
    AuthModule,
    UsersModule,
    //Configuration env
    ConfigModule.forRoot({
      load: [Configuration],
    }),
    //Conect database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'jwtnest',
      port: 5433,
      username: 'postgres',
      password: '123456',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
