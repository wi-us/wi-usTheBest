import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Worker } from './worker.model';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';
import { Role } from 'src/roles/roles.model';
import { OrderService } from 'src/order/order.service';
import { WorkerStatus } from './worker-status.model';
import { CreateWorkerStatusDto } from './dto/create-worker-status.dto';
import { EditWorkerStatusDto } from './dto/edit-worker-status.dto';
import { TakeOrderDto } from './dto/take-order.dto';
import { Order } from 'src/order/order.model';
import { ReqWorkerInfo } from './worker-auth.decorator';

@Injectable()
export class WorkerService {
    constructor(
        @InjectModel(Worker) private workerRepository: typeof Worker,
        @InjectModel(WorkerStatus)
        private workerStatusRepository: typeof WorkerStatus,
        private roleService: RolesService,
        private readonly orderService: OrderService,
    ) {}

    async assignOrderToWorker(dto: TakeOrderDto, reqWorker: ReqWorkerInfo) {
        const order: Order = await this.orderService.getOrderById(dto.orderId);
        console.log(reqWorker);
        // if(!reqWorker){
        //     return new HttpException('Not authorized', HttpStatus.FORBIDDEN);
        // }
        if (!order) {
            return new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }
        const activeStatus = await this.orderService.getOrderStatusByValue(
            'Активный',
        );
        if (!activeStatus) {
            return new HttpException(
                "Order status 'Активный' not found",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        if (order.status == activeStatus.id) {
            return new HttpException(
                'Order already taken',
                HttpStatus.BAD_REQUEST,
            );
        }

        const worker = await this.workerRepository.findByPk(reqWorker.id);
        if (!worker) {
            return new HttpException('Worker not found', HttpStatus.NOT_FOUND);
        }
        await order.$set('worker', worker);
        await order.$set('orderStatus', activeStatus);

        return;
        // return order;
    }

    async finishOrderToWorker(dto: TakeOrderDto, reqWorker: ReqWorkerInfo) {
        const order: Order = await this.orderService.getOrderById(dto.orderId);
        if (!order) {
            return new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }
        const finishStatus = await this.orderService.getOrderStatusByValue(
            'Завершенный',
        );
        if (!finishStatus) {
            return new HttpException(
                "Order status 'Завершен' not found",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        if (order.status == finishStatus.id) {
            return new HttpException(
                'Order already finished',
                HttpStatus.BAD_REQUEST,
            );
        }

        const worker = await this.workerRepository.findByPk(reqWorker.id);
        if (!worker) {
            return new HttpException('Worker not found', HttpStatus.NOT_FOUND);
        }

        await order.$set('orderStatus', finishStatus);
        // return order;
    }

    async addRole(dto: addRoleDto) {
        const worker = await this.workerRepository.findByPk(dto.workerID);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && worker) {
            await worker.$set('role', [role.id]);
            return dto;
        }

        throw new HttpException(
            'ПОользователь или роль не найдены',
            HttpStatus.NOT_FOUND,
        );
    }

    async createWorkerStatus(dto: CreateWorkerStatusDto) {
        const workerStatus = await this.workerStatusRepository.create(dto);
        return workerStatus;
    }

    async getWorkerStatusById(id: number) {
        const workerStatus = await this.workerStatusRepository.findByPk(id);
        if (!workerStatus) {
            return new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return workerStatus;
    }
    async getWorkerStatuses() {
        const workerStatuses = await this.workerStatusRepository.findAll();
        return workerStatuses;
    }

    async editWorkerStatusById(id: number, dto: EditWorkerStatusDto) {
        const workerStatus = await this.workerStatusRepository.findByPk(id);
        if (!workerStatus) {
            return new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        await workerStatus.update('description', dto.description);
        return workerStatus;
    }

    async createWorker(dto: CreateWorkerDto) {
        //Creating worker
        const worker = await this.workerRepository.create(dto);
        let role: Role;
        try {
            role = await this.roleService.getRoleByValue('BASIC');
        } catch (error) {
            role = await this.roleService.createRole({
                value: 'BASIC',
                description: 'Base role',
            });
        }
        if (!role) {
            throw new HttpException(
                'Ошибка role service',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        // console.log(role)
        await worker.$set('role', [role.id]);
        const status = await this.workerStatusRepository.findOne({
            where: { description: 'Онлайн' },
        });
        await worker.$set('status', status);
        worker.role = role;
        worker.status = status;
        return worker;
    }

    async getWorkerById(id: number) {
        const worker = await this.workerRepository.findByPk(id);

        if (!worker) {
            return;
        }

        return worker;
    }

    async getWorkers() {
        const workers = await this.workerRepository.findAll();
        return workers;
    }

    async getWorkerByEmail(email: string) {
        const worker = await this.workerRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return worker;
    }
}
