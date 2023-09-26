import { Controller, Post } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService){}

    @Post()
    createFood(){
        return this.foodService.createFood()
    }
}
