import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { BasketService } from 'src/basket/basket.service';
import { Sequelize } from 'sequelize-typescript';
import { Food } from 'src/food/food.model';

import { UsersService } from 'src/users/users.service';
import { OrderItem } from './order-item.model';
import { BasketFood } from 'src/basket/basket-food.model';
import { Status } from 'src/status/status.model';
import { createOrderStatusDto } from './dto/create-order-status.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private readonly orderRepository: typeof Order,
        @InjectModel(OrderItem)
        private readonly orderItemRepository: typeof OrderItem,
        @InjectModel(Status)
        private readonly orderStatusRepository: typeof Status,
        private readonly basketService: BasketService,

        private readonly userService: UsersService,
        private sequelize: Sequelize,
    ) {}

    async makeOrder(userId: number) {
        const transaction = await this.sequelize.transaction();

        try {
            const userBasket = await this.basketService.getBasketByUserId(
                userId,
            );
            const user = await this.userService.getUserById(userId);
            if (user.balance < userBasket.price) {
                return new HttpException(
                    'У пользователя недостаточно баланса ',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const order = await this.orderRepository.create(
                {
                    date: new Date(),
                    status: 0, // Set the default status as needed
                    price: userBasket.price, // Initialize the price, you'll update it later
                    user_id: userId,
                },
                { transaction },
            );

            await order.$add('foods', userBasket.foods, {
                transaction,
            });

            await Promise.all(
                userBasket.basketFood.map(
                    async (basketFoodItem: BasketFood) => {
                        await this.orderItemRepository.update(
                            { quantity: basketFoodItem.quantity },
                            {
                                where: {
                                    food_ID: basketFoodItem.food.id,
                                    order_ID: order.id,
                                },
                                transaction,
                            },
                        );
                    },
                ),
            );

            // this.orderItemRepository.update({where: {}}, 10)

            // userBasket.foods.map(()=>{

            // })

            await transaction.commit();
            // return userBasket;
            return order;
        } catch (error) {
            // await transaction.rollback();
            console.log(error);
            throw new HttpException(
                'Order not created. Error occured',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getOrderById(orderId: number) {
        const order = await this.orderRepository.findByPk(orderId, {
            include: { model: OrderItem, include: [Food] },
        });

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }
        return order;
    }

    async getActiveOrders() {
        const orders = await this.orderRepository.findAll({
            where: {
                //Status
                status: 0,
            },
            include: [Food],
        });
        return orders;
    }

    async closeOrder(orderId: number) {
        const order = await this.orderRepository.findByPk(orderId);
        await order.update({
            status: 2,
        });
    }

    async createOrderStatus(dto: createOrderStatusDto) {
        const orderStatus = await this.orderStatusRepository.create(dto);
        return orderStatus;
    }
}
