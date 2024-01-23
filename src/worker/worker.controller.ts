import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
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
import { CreateWorkerStatusDto } from './dto/create-worker-status.dto';
import { WorkerStatus } from './worker-status.model';
import { TakeOrderDto } from './dto/take-order.dto';
import { ReqWorkerInfo, WorkerDeco } from './worker-auth.decorator';

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

    @ApiOperation({ summary: 'Выдать/взять заказ работнику' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'BASIC')
    @UseGuards(RolesGuard)
    @Post('/takeorder/')
    takeOrder(@Body() dto: TakeOrderDto, @WorkerDeco() worker: ReqWorkerInfo) {
        return this.workerService.assignOrderToWorker(dto, worker);
    }
    @ApiOperation({ summary: 'Завершить заказ' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'BASIC')
    @UseGuards(RolesGuard)
    @Post('/finishorder/')
    finishOrder(
        @Body() dto: TakeOrderDto,
        @WorkerDeco() worker: ReqWorkerInfo,
    ) {
        return this.workerService.finishOrderToWorker(dto, worker);
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
@ApiTags('Работники')
@Controller('WorkerStatus')
export class WorkerStatusController {
    constructor(private readonly workerService: WorkerService) {}

    @ApiOperation({ summary: 'Создать статус работника' })
    @ApiResponse({ status: 200, type: WorkerStatus })
    @Post('/')
    createWorkerStatus(@Body() dto: CreateWorkerStatusDto) {
        return this.workerService.createWorkerStatus(dto);
    }

    @ApiOperation({ summary: 'Получить все статусы работников' })
    @ApiResponse({ status: 200, type: [WorkerStatus] })
    @Get()
    getStatuses() {
        return this.workerService.getWorkerStatuses();
    }

    @ApiOperation({ summary: 'Получить статус работника по Id' })
    @ApiResponse({ status: 200, type: WorkerStatus })
    @Get('/:statusId')
    getStatusById(@Param('statusId') statusId: number) {
        return this.workerService.getWorkerStatusById(statusId);
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
