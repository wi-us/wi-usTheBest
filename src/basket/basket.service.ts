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
        @InjectModel(BasketFood) private basketFoodRepository: typeof BasketFood,
        private foodService: FoodService,
        private sequelize: Sequelize
    ){}

    async addItemToCart(dto: addItemToCartDto): Promise<Basket>{
        const transaction = await this.sequelize.transaction()
        try {
            const basket = await this.basketRepository.findOne({where:{
                user_ID: dto.user_ID,
            }, include: [Food], transaction})
    
            const foodItem = await this.foodService.getFoodByName(dto.foodName)
    
            if(!basket.foods.includes(foodItem)){
                await basket.$set("foods", [...basket.foods, foodItem], {transaction})
                console.log(typeof basket.price, foodItem.price)
                const basketPrice = Number(basket.price);
                const foodItemPrice =Number(foodItem.price);
                
                await basket.update({price: basketPrice+foodItemPrice}, {transaction})
            }
            const basketFoodItem = await this.basketFoodRepository.findOne({
                where:{
                    basket_ID: basket.id,
                    food_ID: foodItem.id,
                },
                transaction
            })
            await basketFoodItem.update({
                quantity: Number(basketFoodItem.quantity)+1,
                
            }, {
                transaction
            })
            await transaction.commit()
            return basket;

        } catch (error) {
            await transaction.rollback()
            throw error
            
        }
       
        
        
    }


    async createBasket(user_ID: number, transaction: Transaction): Promise<Basket>{
        console.log(user_ID)
        const basket = await this.basketRepository.create({user_ID: user_ID}, {
            transaction
        })
        return basket
    }
    
    async getBasketByUserId(id: number) {
       const basket = await this.basketRepository.findOne({where: 
        {user_ID: id}, 
        include: [
            {
                model: Food, 
                attributes: ["name", "price"]
            },
           
        ]

        })
       return basket
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
                totalPrice: (parseFloat(row.foodPrice) * parseFloat(row.quantity)).toString(), // Calculate total price
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



    // async getBasketByUserId(id: number) {
    //     const query = `
    //       SELECT
    //         "Basket"."id" AS "id",
    //         "Basket"."price" AS "price",
    //         "Basket"."user_ID" AS "user_ID",
    //         "Food"."name" AS "foodName",
    //         "BasketFood"."quantity" AS "quantity",
    //         "Food"."price" AS "foodPrice"
    //       FROM
    //         "Basket"
    //       LEFT JOIN
    //         "BasketFood" ON "Basket"."id" = "BasketFood"."basket_ID"
    //       LEFT JOIN
    //         "Food" ON "BasketFood"."food_ID" = "Food"."id"
    //       WHERE
    //         "Basket"."user_ID" = :userId;
    //     `;
      
    //     const [result, _] = await this.sequelize.query(query, {
    //       replacements: { userId: id },
    //       type: QueryTypes.SELECT,
          
    //     });
      
    //     if (!result) {
    //       return null; // or handle accordingly if no result is found
    //     }

    //     console.log(result)
      
    //     // Group the result by basket properties
    //     // const groupedResult = result.reduce((acc, row) => {
    //     //   const basketInfo = {
    //     //     id: row.id.toString(),
    //     //     price: row.price.toString(),
    //     //     user_ID: row.user_ID.toString(),
    //     //   };
      
    //     //   const foodInfo = {
    //     //     name: row.foodName,
    //     //     quantity: row.quantity.toString(),
    //     //     price: row.foodPrice.toString(),
    //     //   };
      
    //     //   if (!acc[row.id]) {
    //     //     acc[row.id] = { ...basketInfo, foods: [foodInfo] };
    //     //   } else {
    //     //     acc[row.id].foods.push(foodInfo);
    //     //   }
      
    //     //   return acc;
    //     // }, {});
      
    //     // // Extract the first (and only) basket info from the grouped result
    //     // const [mappedBasket] = Object.values(groupedResult);
      
    //     // return mappedBasket;
    //   }

    

    //   private async updateBasketPrice(basketId: number, transaction: Transaction): Promise<void> {
    //     // You can implement logic to recalculate the basket price based on the basket foods and update the basket price
    //     // For simplicity, let's assume the basket price is the sum of the food prices multiplied by their quantities
    //     const basketWithFood = await this.basketRepository.findAll({
    //       where: {
    //         id: basketId,
    //       },
    //       include: [Food],
    //       transaction,
    //     });
    
    //     const totalPrice = basketWithFood.reduce((acc, basketFood) => {
    //       return acc + basketFood.quantity * basketFood.foods.price;
    //     }, 0);
    
    //     // Update the basket price
    //     await this.basketModel.update({ price: totalPrice }, { where: { id: basketId }, transaction });
    //   }
}
