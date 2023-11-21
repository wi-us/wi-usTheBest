import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { BasketService } from 'src/basket/basket.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private basketService: BasketService,
        private sequlize: Sequelize,
    ) {}

    async getUserByTelegramId(telegram_ID: string) {
        const user = await this.userRepository.findOne({
            where: {
                telegram_ID,
            },
        });
        return user;
    }

    async createUser(dto: CreateUserDto) {
        const transaction = await this.sequlize.transaction();
        try {
            //Creating user
            let user = await this.userRepository.findOne({
                where: { telegram_ID: dto.telegram_ID },
                transaction,
            });

            if (!user) {
                user = await this.userRepository.create(dto);
                await this.basketService.createBasket(user.id, transaction);
            }
            await transaction.commit();
            //Creating basket for user

            return user;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async editUserData(dto: EditUserDto) {
        const user = this.userRepository.findByPk(dto.id);
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findByPk(id, {
            include: { all: true },
        });

        if (!user) {
            return;
        }

        return user;
    }

    async getUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
