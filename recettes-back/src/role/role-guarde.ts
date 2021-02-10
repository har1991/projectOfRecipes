import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    console.log('role=',roles);
    if (!roles) {
      return true;
    }
    //const request2 = context.switchToHttp().getResponse()
    //
    const request = context.switchToHttp().getRequest();
    //const user = request.user;
    //console.log('requestUser =',request.user) ;
    console.log(request.user.role.role_name);
    if(roles.includes(request.user.role.role_name)){
      return true ;
    }
      else  {
        return false ; 
      }
    }
    //return true ;
    //return matchRoles(roles, user.roles);
    
    }
  