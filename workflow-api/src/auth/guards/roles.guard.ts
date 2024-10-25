import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggedInDto } from '../dto/logged-in.dto';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // get roles from decorator
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: LoggedInDto = request.user;

    return roles.includes(user.role);
  }
}