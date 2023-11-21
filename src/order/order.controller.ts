import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { Status } from 'src/status/status.model';
import { createOrderStatusDto } from './dto/create-order-status.dto';

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
    @ApiResponse({ status: 200, type: Order })
    @Get('/:orderId')
    async getOrderById(@Param('orderId') userId: number) {
        return this.orderService.getOrderById(userId);
    }

    @ApiOperation({ summary: 'Получить активные заказы' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/')
    async getActiveOrders() {
        return this.orderService.getActiveOrders();
    }
}
@Controller('orderstatus')
export class OrderStatusController {
    constructor(private orderService: OrderService) {}

    @ApiOperation({ summary: 'Создать тип заказа' })
    @ApiResponse({ status: 200, type: Status })
    @Post('/')
    async createOrderStatus(@Body() dto: createOrderStatusDto) {
        return this.orderService.createOrderStatus(dto);
    }
}
