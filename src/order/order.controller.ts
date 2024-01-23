import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { Status } from 'src/status/status.model';
import { createOrderStatusDto } from './dto/create-order-status.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @ApiOperation({ summary: 'Сделатт заказ по user_id' })
    @ApiResponse({ status: 200 })
    @Post('/:userId')
    async makeOrder(@Param('userId') userId: number) {
        return this.orderService.makeOrder(userId);
    }

    @ApiOperation({ summary: 'Сделатт заказ по user_id' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/:userId')
    async getOrderByUserId(@Param('userId') userId: number) {
        return this.orderService.getOrdersByUserId(userId);
    }

    @ApiOperation({ summary: 'Получить активные заказы' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/')
    async getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @ApiOperation({ summary: 'Удалить заказ по id' })
    @ApiResponse({ status: 201, description: 'Ok' })
    @Delete('/:orderId')
    async deleteOrderById(@Param('orderId') orderId: number) {
        return this.orderService.deleteOrderById(orderId);
    }
}

@ApiTags('OrderStatus')
@Controller('activeorder')
export class ActiveController {
    constructor(private orderService: OrderService) {}
    @ApiOperation({ summary: 'Получить активные заказы' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('')
    async getActiveOrders() {
        return this.orderService.getActiveOrders();
    }
}

@ApiTags('OrderStatus')
@Controller('orderstatus')
export class OrderStatusController {
    constructor(private orderService: OrderService) {}

    @ApiOperation({ summary: 'Создать статус заказа' })
    @ApiResponse({ status: 201, type: Status })
    @Post('/')
    async createOrderStatus(@Body() dto: createOrderStatusDto) {
        return this.orderService.createOrderStatus(dto);
    }
    @ApiOperation({ summary: 'Получить все статусы заказа' })
    @ApiResponse({ status: 200, type: [Status] })
    @Get('/')
    async getAllOrderStatus() {
        return this.orderService.getAllOrderStatus();
    }
    @ApiOperation({ summary: 'Редактировать статус заказа' })
    @ApiResponse({ status: 200, type: Status })
    @Put('/:orderStatusId')
    async editOrderStatus(
        @Param('orderStatusId') statusId: number,
        @Body() dto: createOrderStatusDto,
    ) {
        return this.orderService.editOrderStatus(statusId, dto);
    }
    @ApiOperation({ summary: 'Удалить статус заказа' })
    @ApiResponse({ status: 201 })
    @Delete('/:orderStatusId')
    async deleteOrderStatus(@Param('orderStatusId') statusId: number) {
        return this.orderService.deleteOrderStatusById(statusId);
    }
}
