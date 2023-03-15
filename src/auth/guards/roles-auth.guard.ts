import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth-public.decorator';

@Injectable()
//Guard custom para que verifique si el endpoint es publico
export class RolesAuthGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    let roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
    ]);

    if (!roles) {
      roles.push('user');
    }
    const request = context.switchToHttp().getRequest().user.roles;

    request;
    console.log(`roles :${roles}`);

    return true;
  }
}
