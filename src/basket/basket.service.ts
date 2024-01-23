import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './basket.model';
import { addItemToCartDto } from './dto/add-food-to-cart.dto';
import { Food } from 'src/food/food.model';
import { FoodService } from 'src/food/food.service';
import { BasketFood } from './basket-food.model';
import { Sequelize } from 'sequelize-typescript';
import Transaction from 'sequelize/types/transaction';
import { QueryTypes } from 'sequelize';
// import { FoodType } from 'src/food/food_type.model';

@Injectable()
export class BasketService {
    constructor(
        @InjectModel(Basket) private basketRepository: typeof Basket,
        @InjectModel(Food) private foodRepository: typeof Food,
        @InjectModel(BasketFood)
        private basketFoodRepository: typeof BasketFood,
        private foodService: FoodService,
        private sequelize: Sequelize,
    ) {}

    async addItemToCart(dto: addItemToCartDto) {
        const transaction = await this.sequelize.transaction();
        try {
            const basket = await this.basketRepository.findOne({
                where: {
                    user_ID: dto.user_ID,
                },
                include: [
                    { model: BasketFood, include: [Food] },
                    { model: Food, include: [BasketFood] },
                ],
                transaction,
            });

            const foodItem = await this.foodService.getFoodByName(dto.foodName);

            if (!basket.foods.includes(foodItem)) {
                await basket.$set('foods', [...basket.foods, foodItem], {
                    transaction,
                });
                console.log(typeof basket.price, foodItem.price);
                const basketPrice = Number(basket.price);
                const foodItemPrice = Number(foodItem.price);

                await basket.update(
                    { price: basketPrice + foodItemPrice },
                    { transaction },
                );
            }
            const basketFoodItem = await this.basketFoodRepository.findOne({
                where: {
                    basket_ID: basket.id,
                    food_ID: foodItem.id,
                },
                transaction,
            });
            await basketFoodItem.update(
                {
                    quantity: Number(basketFoodItem.quantity) + 1,
                },
                {
                    transaction,
                },
            );
            await transaction.commit();
            return basket;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async clearBasket(userId: number) {
        const transaction = await this.sequelize.transaction();
        try {
            //FIX THIS FUCKING CODE
            const basket = await this.getBasketByUserId(userId);
            await Promise.all([
                basket.basketFood.forEach(
                    async (basketFoodItem: BasketFood) => {
                        await basketFoodItem.update('quantity', 0, {
                            transaction,
                        });
                    },
                ),
            ]);

            await basket.$set('foods', [], { transaction });
            await transaction.commit();
            return;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async createBasket(
        user_ID: number,
        transaction: Transaction,
    ): Promise<Basket> {
        console.log(user_ID);
        const basket = await this.basketRepository.create(
            { user_ID: user_ID },
            {
                transaction,
            },
        );
        return basket;
    }

    async getBasketByUserId(id: number) {
        const basket = await this.basketRepository.findOne({
            where: { user_ID: id },
            include: [
                { model: BasketFood, include: [Food] },
                { model: Food, include: [BasketFood] },
            ],
        });
        return basket;
    }
    async getBasketWithFood(id: number) {
        const basket = await this.basketRepository.findOne({
            where: { user_ID: id },
            include: [{ model: Food }],
        });
        return basket;
    }

    formatBasketInfo(ormOutput: any): any {
        const formattedBasket: any = {
            id: ormOutput.id.toString(),
            price: ormOutput.price.toString(),
            user_ID: ormOutput.user_ID.toString(),
            foods: ormOutput.basketFood.map((basketFood: any) => ({
                name: basketFood.food.name,
                price: basketFood.food.price.toString(),
                quantity: basketFood.quantity.toString(),
                totalPrice: (
                    parseFloat(basketFood.food.price) *
                    parseFloat(basketFood.quantity)
                ).toString(),
            })),
        };

        return formattedBasket;
    }
    //Target data object
    // {'id': '1',
    // 'price': '124.55',
    // 'user_ID': '10',
    // 'foods': [
    //     {
    //         'name': 'Пицца',
    //         'price': '21.11',

    //         'quantity': '14'
    //         },
    //         {'name': 'Кола',
    //          'price': '40.11',
    //         'quantity': '2',
    //         }
    //     }
    //     ]

    // }

    async getBasketInfoByUserId(userId: number) {
        const query = `
          SELECT
            "Basket"."id" AS "id",
            "Basket"."price" AS "price",
            "Basket"."user_ID" AS "user_ID",
            "Food"."name" AS "name",
            "Food"."price" AS "foodPrice",
            "BasketFood"."quantity" AS "quantity"
          FROM
            "Basket"
          LEFT JOIN
            "BasketFood" ON "Basket"."id" = "BasketFood"."basket_ID"
          LEFT JOIN
            "Food" ON "BasketFood"."food_ID" = "Food"."id"
          WHERE
            "Basket"."user_ID" = :userId;
        `;

        const result = await this.sequelize.query(query, {
            replacements: { userId: userId },
            type: QueryTypes.SELECT,
        });

        if (!result || result.length === 0) {
            return null; // or handle accordingly if no result is found
        }

        // Group the result by basket properties
        const groupedResult = result.reduce((acc, row: any) => {
            const foodInfo = {
                name: row.name,
                price: row.foodPrice.toString(),
                quantity: row.quantity.toString(),
                totalPrice: (
                    parseFloat(row.foodPrice) * parseFloat(row.quantity)
                ).toString(), // Calculate total price
            };

            if (!acc[row.id]) {
                acc[row.id] = {
                    id: row.id.toString(),
                    price: row.price.toString(),
                    user_ID: row.user_ID.toString(),
                    foods: [foodInfo],
                };
            } else {
                acc[row.id].foods.push(foodInfo);
            }

            return acc;
        }, {});

        // Extract the first (and only) basket info from the grouped result
        const [formattedBasket] = Object.values(groupedResult);

        return formattedBasket;
    }
}
