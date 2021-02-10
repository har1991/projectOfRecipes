import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { RoleService } from './role.service';
import { RoleDto } from './roleDto';

@Controller('role')
export class RoleController {
    constructor(private role_service: RoleService) { }

    @Get()
    async get_all_roles(): Promise<RoleEntity[]> {
        return this.role_service.get_roles();

    }


    @Get(':id')
    async get_role_by_id(
        @Param('id', ParseIntPipe) id: number): Promise<RoleEntity> {
        console.log(id)
        return await this.role_service.get_role_by_id(id);
    }


    @Delete(':id')
    delete_role(@Param('id', ParseIntPipe) id: number) {
        return this.role_service.delete_role(id);
    }

    @Post()

    async add_role(@Body() role_dto: RoleDto): Promise<RoleEntity> {

        return await this.role_service.add_role(role_dto);
    }

    @Patch(':id')
    async update_role(
    @Body() update_role:RoleDto,
    @Param('id',ParseIntPipe)id:number){
        return await this.role_service.update_role(id ,update_role );
    }

}
