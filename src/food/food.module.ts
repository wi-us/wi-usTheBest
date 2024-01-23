import { Module } from '@nestjs/common';
import { FoodController, FoodTypeController } from './food.controller';
import { FoodService } from './food.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './food.model';
import { FoodType } from './food_type.model';
import { BasketFood } from 'src/basket/basket-food.model';
import { Basket } from 'src/basket/basket.model';

@Module({
    controllers: [FoodController, FoodTypeController],
    providers: [FoodService],
    imports: [SequelizeModule.forFeature([Food, FoodType])],
    exports: [FoodService],
})
export class FoodModule {}
