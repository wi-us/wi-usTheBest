import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { EditRoleDto } from './dto/edit-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({ summary: 'Создание роли' })
    @ApiResponse({ status: 200 })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Получить роль по знаечнию value' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Получить все роли' })
    @ApiResponse({ status: 200, type: [Role] })
    @Get()
    getAll() {
        return this.roleService.getAll();
    }
    @ApiOperation({ summary: 'Редактировать роль' })
    @ApiResponse({ status: 200, type: Role })
    @Put('/:roleId')
    editRole(@Param('roleId') roleId: number, @Body() dto: EditRoleDto) {
        return this.roleService.editRoleById(roleId, dto);
    }
    @ApiOperation({ summary: 'Удалить роль' })
    @ApiResponse({ status: 201, type: Role })
    @Delete('/:roleId')
    deleteRole(@Param('roleId') roleId: number) {
        return this.roleService.deleteRoleById(roleId);
    }
}
