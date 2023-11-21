import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { WorkerService } from './worker.service';
import { Worker } from './worker.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { addRoleDto } from './dto/add-role.dto';

@ApiTags('Работники')
@Controller('worker')
@ApiBearerAuth()
export class WorkerController {
    constructor(private readonly workerService: WorkerService) {}

    @ApiOperation({ summary: 'Получение работника' })
    @ApiResponse({ status: 200, type: [Worker] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.workerService.getWorkers();
    }

    @ApiOperation({ summary: 'Выдать роль' })
    @ApiResponse({ status: 200 })
    @Roles('OWNER')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: addRoleDto) {
        return this.workerService.addRole(dto);
    }
    // @ApiOperation({ summary: 'Выдать роль' })
    // @ApiResponse({ status: 200 })
    // @Roles('OWNER')
    // @UseGuards(RolesGuard)
    // @Get('/role')
    // addRole(@Body() dto: addRoleDto) {
    //     return this.workerService.addRole(dto);
    // }
}
