import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async getAllFood() {
        const foodItems = await this.foodRepository.findAll({include: "foodType"})
        return foodItems
    }    

    async getFoodByName(name: string) {
       const foodItem = await this.foodRepository.findOne({where: {name}});
       return foodItem;
    }
    

    async createFood(dto: CreateFoodDto){
       
        const foodType = await this.findOrCreateTypeByName(dto.type)
       
        let foodItem = await this.getFoodByName(dto.name)
        if(!foodItem){
            foodItem = await this.foodRepository.create({
                
                name: dto.name,
                type_id: foodType.id,
                picture: dto.picture,
                price:dto.price,
            })
        }

        
        if(!foodItem){
            throw new HttpException("Ошибка при создании ", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return dto; 
       
    }

    async findOrCreateTypeByName(name:string){
        const [foodType, created] = await this.foodTypeRepository.findOrCreate({where:{type: name}})
        // if(!created){
        //     throw new HttpException("Такой тип уже су", HttpStatus.NOT_FOUND)
        // }
        return foodType;
    }

    async createFoodType(dto: CreateFoodTypeDto) {
        const foodTypeItem = await this.foodTypeRepository.create(dto);
        return foodTypeItem;
    }

     

}
