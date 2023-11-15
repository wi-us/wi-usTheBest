import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './food.model';
import { FoodType } from './food_type.model';
import { BasketFood } from 'src/basket/basket-food.model';
import { Basket } from 'src/basket/basket.model';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [SequelizeModule.forFeature([Food, FoodType, Basket, BasketFood])],
  exports:[
    FoodService
  ],
})
export class FoodModule {}
