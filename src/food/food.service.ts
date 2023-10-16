import { Injectable } from '@nestjs/common';
import { Food } from './food.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FoodService {

    constructor(@InjectModel(Food) private foodRepository: typeof Food){}

    async createFood(dto){

    }

}
