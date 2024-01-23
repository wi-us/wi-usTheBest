import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { EditRoleDto } from './dto/edit-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private readonly RoleRepository: typeof Role,
    ) {}

    async editRoleById(roleId: number, dto: EditRoleDto) {
        const role = await this.RoleRepository.findByPk(roleId);
        await role.update(dto);
        return role;
    }
    async deleteRoleById(roleId: number) {
        const role = await this.RoleRepository.findByPk(roleId);
        if (!role) {
            return new HttpException(
                'Role with that id not exist',
                HttpStatus.NOT_FOUND,
            );
        }
        await role.destroy();
        return;
    }
    async getAll() {
        const roles = await this.RoleRepository.findAll();
        return roles;
    }

    async createRole(dto: CreateRoleDto) {
        const role = await this.RoleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.RoleRepository.findOne({ where: { value } });
        return role;
    }
}
