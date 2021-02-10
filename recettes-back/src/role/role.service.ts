import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleDto } from './roleDto';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleEntity)
        private role_repositry: Repository<RoleEntity>) { }


    async get_roles(): Promise<RoleEntity[]> {
        return await this.role_repositry.find()
    }
    async get_role_by_id(role_id: number): Promise<RoleEntity> {
        const role = await this.role_repositry.findOne(role_id)
        if (!role) {
            console.log('there is no role')
            throw new NotFoundException(`Sorry Role with id :${role_id} is not exist `);
            
        }
        else {
            console.log('there is a  role', role)
            return role
        }
    }
    async add_role(role: RoleDto) {

        return await this.role_repositry.save(role);
    }
    async delete_role(role_id: number) {
        const role = await this.get_role_by_id(role_id);
        return await this.role_repositry.remove(role);
    }
    async update_role(id: number, role: RoleDto) {
        const update_role = await this.role_repositry.preload({  // With (preload) We will get the role using it's id and then update  it  
            id,
            ...role
        })//verifying whether the role we are targeting exist or not
        if (!update_role) {
            throw new NotFoundException(`Sorry Role with id :${id} is not exist `);
        }
        return await this.role_repositry.save(update_role);
    }
}
