import {IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { ManyToMany } from 'typeorm';
export class RoleDto{
    id: number ; 

    @IsNotEmpty()
    @IsString()
    role_name : string ; 

    
}