import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    
    constructor(@InjectModel(Role) private readonly RoleRepository: typeof Role){}


    async getAll() {
        const roles = await this.RoleRepository.findAll();
        return roles;
    }

    async createRole(dto: CreateRoleDto){
        const role = await this.RoleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string){
        const role = await this.RoleRepository.findOne({where: {value}});
        return role;
    }
}
