import { PermissionEntity } from "src/permission/entities/permission.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 20 })
    role_name: string;

    @OneToMany(type => UserEntity,
        (users) => users.role)

    users: UserEntity;

    @ManyToMany(type => PermissionEntity, permission => permission.role)
    permission: PermissionEntity[];
}
