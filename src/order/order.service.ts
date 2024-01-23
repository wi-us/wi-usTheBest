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
import { Transaction } from 'sequelize';

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

    async getAllOrders() {
        const orders = await this.orderRepository.findAll({ include: Food });
        return orders;
    }

    async makeOrder(userId: number) {
        const transaction = await this.sequelize.transaction();

        try {
            const userBasket = await this.basketService.getBasketByUserId(
                userId,
            );
            const user = await this.userService.getUserById(userId);
            if (
                parseFloat(user.balance.toString()) <
                parseFloat(user.balance.toString())
            ) {
                return new HttpException(
                    'У пользователя недостаточно баланса ',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const order = await this.orderRepository.create(
                {
                    date: new Date(),

                    price: userBasket.price, // Initialize the price, you'll update it later
                    user_id: userId,
                },
                { transaction },
            );
            // const status = await this.orderStatusRepository.findOne({
            //     where: {
            //         type: "Активный"
            //     }
            // })
            // await order.$set("status", status, {transaction})
            // await order.$add("Status")

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
            const order_data = await this.getOrderById(order.id);
            return order_data;
        } catch (error) {
            // await transaction.rollback();
            console.log(error);
            throw new HttpException(
                'Order not created. Error occured',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    async getAllOrderStatus() {
        const statuses = await this.orderStatusRepository.findAll();
        return statuses;
    }
    async editOrderStatus(statusId: number, dto: createOrderStatusDto) {
        const status = await this.orderStatusRepository.findByPk(statusId);
        if (!status) {
            return this.throwOrderStatusNotExist();
        }
        await status.update(dto);
        return status;
    }
    async deleteOrderStatusById(statusId: number) {
        const orderStatus = await this.orderStatusRepository.findByPk(statusId);
        if (!orderStatus) {
            this.throwOrderStatusNotExist();
        }
        await orderStatus.destroy();
        return;
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
    async deleteOrderById(orderId: number) {
        const transaction: Transaction = await this.sequelize.transaction();
        try {
            const order = await this.orderRepository.findByPk(orderId);
            if (!order) {
                await transaction.rollback();
                return this.throwOrderNotExist();
            }
            const orderItems = await this.orderItemRepository.findAll({
                where: { order_ID: orderId },
                transaction,
            });
            await this.orderItemRepository.destroy({
                where: { order_ID: orderId }, // Replace with the actual condition to match OrderItems with the order
                transaction,
            });
            await this.orderRepository.destroy({
                where: { id: orderId },
                transaction,
            });

            await transaction.commit();
            return;
        } catch (error) {
            console.log(error);

            await transaction.rollback();
        }
    }

    async getOrdersByUserId(userId: number) {
        const order = await this.orderRepository.findAll({
            where: {
                user_id: userId,
            },
            include: { model: OrderItem, include: [Food] },
        });

        if (!order) {
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

    async getOrderStatusByValue(value: string) {
        const orderStatus: Status = await this.orderStatusRepository.findOne({
            where: {
                type: value,
            },
        });
        return orderStatus;
    }

    throwOrderStatusNotExist() {
        return new HttpException(
            'Status with that id not found',
            HttpStatus.NOT_FOUND,
        );
    }
    throwOrderNotExist() {
        return new HttpException(
            'Order with that id not found',
            HttpStatus.NOT_FOUND,
        );
    }
}
