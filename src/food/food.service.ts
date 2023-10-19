import { Injectable } from '@nestjs/common';
import { Food } from './food.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodType } from './food_type.model';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';

@Injectable()
export class FoodService {
    

    constructor(
        @InjectModel(Food) private foodRepository: typeof Food,
        @InjectModel(FoodType) private foodTypeRepository: typeof FoodType,
    ){}

    async createFood(dto: CreateFoodDto){
        const foodItem = await this.foodRepository.create(dto);
        return foodItem; 
    }

    async createFoodType(dto: CreateFoodTypeDto) {
        const foodTypeItem = await this.foodTypeRepository.create(dto);
        return foodTypeItem;
    }

     

}
