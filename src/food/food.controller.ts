import { Body, Controller, Post } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { Food } from './food.model';
import { FoodType } from './food_type.model';

@ApiTags("Food")
@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService){}

    @ApiOperation({summary: "Создание Продукта"})
    @ApiResponse({status: 200, type: Food})
    @Post()
    createFood(@Body() dto: CreateFoodDto){
        return this.foodService.createFood(dto)
    }

    @ApiOperation({summary: "Создание категории продукта"})
    @ApiResponse({status: 200, type: FoodType})
    @Post("/type")
    createFoodType(@Body() dto: CreateFoodTypeDto){
        return this.foodService.createFoodType(dto);
    }
}
