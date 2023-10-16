import { Body, Controller, Post } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService){}

    @Post()
    createFood(@Body() dto: CreateFoodDto){
        return this.foodService.createFood(dto)
    }
}
