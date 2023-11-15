import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './basket.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { addItemToCartDto } from './dto/add-food-to-cart.dto';
import { BasketService } from './basket.service';


@ApiTags("Basket")
@Controller('basket')
export class BasketController {
    constructor(
      private basketService: BasketService
    ){}


    @ApiOperation({summary: "Добавить еду в корзину по telegram_ID пользователя"})
    @ApiResponse({status: 200, type: Basket})
    @Post("/add")
    async addItemToCart(@Body() dto: addItemToCartDto){
        return this.basketService.addItemToCart(dto)
    }

    @ApiOperation({summary: "Получить корзину пользователя по id"})
    @ApiResponse({status: 200, type: Basket})
    @Get("/:id")
    async getBasketByUserId(@Param("id") id: number){
        return this.basketService.getBasketInfoByUserId(id)
    }

}
