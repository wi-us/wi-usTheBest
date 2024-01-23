import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Food } from './food.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodType } from './food_type.model';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { EditFoodTypeDto } from './dto/edit-food-type.dto';
import { EditFoodDto } from './dto/edit-food.dto';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class FoodService {
    constructor(
        @InjectModel(Food) private foodRepository: typeof Food,
        @InjectModel(FoodType) private foodTypeRepository: typeof FoodType,
    ) {}

    async deleteFoodTypeById(foodTypeId: number) {
        const foodType = await this.foodTypeRepository.findByPk(foodTypeId);
        if (!foodType) {
            return new HttpException(
                'Food Type with that id not found',
                HttpStatus.NOT_FOUND,
            );
        }
        await foodType.destroy();
        return;
    }

    async getFoodTypeById(id: number) {
        const foodType = await this.foodTypeRepository.findByPk(id);
        if (!foodType) {
            this.throwNonExist();
        }
        return foodType;
    }

    async getFoodTypes() {
        const typess = await this.foodTypeRepository.findAll();
        // console.log(typess);
        // console.log('first');
        return typess;
    }
    async editFoodTypes(foodTypeId: number, dto: EditFoodTypeDto) {
        const type = await this.foodTypeRepository.findByPk(foodTypeId);
        if (!type) {
            return this.throwNonExist();
        }

        await type.update({
            type: dto.type,
        });
        return type;
    }

    async getAllFood() {
        const foodItems = await this.foodRepository.findAll({
            include: 'foodType',
        });
        return foodItems;
    }

    async editFood(foodId: number, dto: EditFoodDto) {
        const foodType = await this.findOrCreateTypeByName(dto.type);
        try {
            const food = await this.foodRepository.findByPk(foodId);
            if (!food) {
                return this.throwNonExist();
            }

            await food.update({
                name: dto.name,
                type_id: foodType.id,
                picture: dto.picture,
                price: dto.price,
            });

            return food;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteFoodById(foodId: number) {
        const food = await this.foodRepository.findByPk(foodId);
        if (!food) {
            return this.throwNonExist();
        }
        await food.destroy();
        return;
    }

    async getFoodByName(name: string) {
        const foodItem = await this.foodRepository.findOne({ where: { name } });
        return foodItem;
    }

    async createFood(dto: CreateFoodDto) {
        try {
            const foodType = await this.findOrCreateTypeByName(dto.type);

            let foodItem = await this.getFoodByName(dto.name);
            if (!foodItem) {
                foodItem = await this.foodRepository.create({
                    name: dto.name,
                    type_id: foodType.id,
                    picture: dto.picture,
                    price: dto.price,
                });
            }

            if (!foodItem) {
                return this.throwNonExist();
            }

            return dto;
        } catch (error) {
            console.log(error);
        }
    }

    async findOrCreateTypeByName(name: string) {
        const [foodType, created] = await this.foodTypeRepository.findOrCreate({
            where: { type: name },
        });
        // if(!created){
        //     throw new HttpException("Такой тип уже су", HttpStatus.NOT_FOUND)
        // }
        return foodType;
    }

    async createFoodType(dto: CreateFoodTypeDto) {
        const foodTypeItem = await this.foodTypeRepository.create(dto);
        return foodTypeItem;
    }

    throwNonExist() {
        return new HttpException('that id not exist', HttpStatus.NOT_FOUND);
    }
}
