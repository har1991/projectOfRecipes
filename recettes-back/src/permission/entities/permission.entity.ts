import { RoleEntity } from "src/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('permission')
export class PermissionEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name : string ; 

    @ManyToMany(type => RoleEntity,role=> role.permission,
        {
            cascade: true,
            eager : true 
        })     
    @JoinTable()
    role : RoleEntity[] ;
    
}
