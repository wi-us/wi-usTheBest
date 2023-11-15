import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { Basket } from './basket.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketFood } from './basket-food.model';
import { Food } from 'src/food/food.model';
import { FoodModule } from 'src/food/food.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports:[
    
    SequelizeModule.forFeature([Basket, Food, BasketFood]),
    FoodModule,
  ],
  exports:[
    BasketService,
  ]
})
export class BasketModule {}
