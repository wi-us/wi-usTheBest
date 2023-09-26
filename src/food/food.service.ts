import { Injectable } from '@nestjs/common';
import { Food } from './food.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FoodService {

    constructor(@InjectModel(Food) private userRepository: typeof Food){}

    async createFood(dto: FoodCreationDto){

    }

}
