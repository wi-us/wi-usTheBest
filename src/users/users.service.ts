import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Basket } from 'src/basket/basket.model';
import { CreateBasketDto } from 'src/basket/dto/create-basket.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Basket) private basketRepository: typeof Basket,
        
    ){}

    async createUser(dto: CreateUserDto){
        
        //Creating user 
        const user = await this.userRepository.create(dto)


        //Creating basket for user
         await this.basketRepository.create({user_ID: user.id})
       
       

        return user;
    }

   async editUserData(dto: EditUserDto){
        const user = this.userRepository.findByPk(dto.id)

        
   }

   async getUserById(id: number){
    const user = await this.userRepository.findByPk(id, {include: {all: true}})
    
    if(!user){
        return 
    }

    return user


   }

    async getUsers(){
        const users = await this.userRepository.findAll()
        return users;
    }
}
