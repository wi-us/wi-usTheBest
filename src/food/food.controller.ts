import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { Food } from './food.model';
import { FoodType } from './food_type.model';
import { ResponseFoodDto } from './dto/response-food.dto';
import { EditFoodTypeDto } from './dto/edit-food-type.dto';
import { EditFoodDto } from './dto/edit-food.dto';

@ApiTags('Food')
@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) {}

    @ApiOperation({ summary: 'Создание Продукта' })
    @ApiResponse({ status: 200, type: Food })
    @Post()
    createFood(@Body() dto: CreateFoodDto) {
        return this.foodService.createFood(dto);
    }

    @ApiOperation({ summary: 'Получение продукта по имени' })
    @ApiResponse({ status: 200, type: Food })
    @Get('/:name')
    getFoodByName(@Param('name') name: string) {
        return this.foodService.getFoodByName(name);
    }

    @ApiOperation({ summary: 'Получение продуктов' })
    @ApiResponse({ status: 200, type: [ResponseFoodDto] })
    @Get()
    getFood() {
        return this.foodService.getAllFood();
    }

    @ApiOperation({ summary: 'Редактирование продукта' })
    @ApiResponse({ status: 200, type: Food })
    @Put('/:foodId')
    editFoodTypes(@Param('foodId') foodId: number, @Body() dto: EditFoodDto) {
        return this.foodService.editFood(foodId, dto);
    }

    @ApiOperation({ summary: 'Удаление продуктов' })
    @ApiResponse({ status: 201 })
    @Delete('/:foodId')
    deleteFoodTypes(@Param('foodId') foodId: number) {
        return this.foodService.deleteFoodById(foodId);
    }
}
@ApiTags('FoodType')
@Controller('foodType')
export class FoodTypeController {
    constructor(private readonly foodService: FoodService) {}

    @ApiOperation({ summary: 'Создание категории продукта' })
    @ApiResponse({ status: 200, type: FoodType })
    @Post()
    createFoodType(@Body() dto: CreateFoodTypeDto) {
        return this.foodService.createFoodType(dto);
    }

    @ApiOperation({ summary: 'Получение категорий по значению' })
    @ApiResponse({ status: 200, type: [FoodType] })
    @Get('/:id')
    getFoodTypeByValue(@Param('id') id: number) {
        return this.foodService.getFoodTypeById(id);
    }

    @ApiOperation({ summary: 'Получение категорий продуктов' })
    @ApiResponse({ status: 200, type: [FoodType] })
    @Get()
    getFoodTypes() {
        return this.foodService.getFoodTypes();
    }

    @ApiOperation({ summary: 'Редактирование категорий продуктов' })
    @ApiResponse({ status: 200, type: FoodType })
    @Put('/:foodTypeId')
    editFoodTypes(
        @Param('foodTypeId') foodTypeId: number,
        @Body() dto: EditFoodTypeDto,
    ) {
        return this.foodService.editFoodTypes(foodTypeId, dto);
    }

    @ApiOperation({ summary: 'Удаление категории продукта' })
    @ApiResponse({ status: 201 })
    @Delete('/:foodTypeId')
    deleteFoodTypes(@Param('foodTypeId') foodTypeId: number) {
        return this.foodService.deleteFoodTypeById(foodTypeId);
    }
}
