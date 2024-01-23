import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { BasketModule } from './basket/basket.module';
import { Basket } from './basket/basket.model';
import { FoodModule } from './food/food.module';
import { Order } from './order/order.model';
import { FoodType } from './food/food_type.model';
import { Food } from './food/food.model';
import { Status } from './status/status.model';
import { RolesModule } from './roles/roles.module';
import { Worker } from './worker/worker.model';
import { Role } from './roles/roles.model';
import { WorkerStatus } from './worker/worker-status.model';
import { WorkerModule } from './worker/worker.module';
import { AuthModule } from './auth/auth.module';
import { BasketFood } from './basket/basket-food.model';
import { OrderHistory } from './order/order-history.model';
import { OrderItem } from './order/order-item.model';
import { OrderModule } from './order/order.module';

// const store = Postgres({
// 	host: "127.0.0.1",
// 	database: "telegraf-test",
// 	user: "database-user",
// 	password: "hunter2",
// });

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                User,
                Basket,
                Order,
                FoodType,
                Food,
                Status,
                Worker,
                Role,
                WorkerStatus,
                BasketFood,
                OrderHistory,
                OrderItem,
            ],
            autoLoadModels: true,
            dialectOptions: { decimalNumbers: true },
            //  synchronize: true,
            //  sync: {force: true},
        }),
        UsersModule,
        BasketModule,
        FoodModule,
        RolesModule,
        WorkerModule,
        AuthModule,
        OrderModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
