import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { Postgres } from "@telegraf/session/pg";
import { session } from 'telegraf';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { BasketModule } from './basket/basket.module';
import { Basket } from './basket/basket.model';
import { FoodModule } from './food/food.module';
import { Admins } from './admin/admin.model';
import { Order } from './order/order.model';
import { FoodType } from './food/food_type.model';
import { Food } from './food/food.model';
import { Status } from './status/status.model';
import { Сourier } from './courier/courier.model';



// const store = Postgres({
// 	host: "127.0.0.1",
// 	database: "telegraf-test",
// 	user: "database-user",
// 	password: "hunter2",
// });


@Module({
 
  imports:[
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      models: [User, Basket, Admins, Order, FoodType, Food, Status, Сourier],
      autoLoadModels: true,
      }),
    UsersModule,
    BasketModule,
    FoodModule,  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
