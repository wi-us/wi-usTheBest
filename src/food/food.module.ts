import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './food.model';
import { FoodType } from './food_type.model';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [SequelizeModule.forFeature([Food, FoodType])]
})
export class FoodModule {}
