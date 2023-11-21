import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController, OrderStatusController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { BasketModule } from 'src/basket/basket.module';

import { UsersModule } from 'src/users/users.module';
import { OrderItem } from './order-item.model';
import { Status } from 'src/status/status.model';

@Module({
    providers: [OrderService],
    controllers: [OrderController, OrderStatusController],
    imports: [
        SequelizeModule.forFeature([Order, OrderItem, Status]),
        BasketModule,

        UsersModule,
    ],
    exports: [OrderService],
})
export class OrderModule {}
