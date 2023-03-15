import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
//Guard custom para que verifique si el endpoint es publico
export class RolesAuthGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    //Obtengo los reoles que le pase al decorador
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
    ]);
    //Recupero los roles del request del payload del JWT
    const user = context.switchToHttp().getRequest().user;

    if (!user) return true;

    if (user.roles.includes('admin')) return true;

    if (!roles) roles.push('user');

    if (user.roles.some((r: string) => roles.includes(r))) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
