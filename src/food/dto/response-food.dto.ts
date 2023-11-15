import { ApiProperty } from "@nestjs/swagger";
import { FoodType } from "../food_type.model";



export class ResponseFoodDto{
    
    @ApiProperty({example: "Пицца", description: "Название продукта"})
    readonly  name: string;

    @ApiProperty({example: "https://example.com/api/1.jpg", description: "Ссылка на картинку продукта"})
    readonly picture: string;

    @ApiProperty({example: "Фастфуд", description: "тип продукта"})
    readonly type_id: number ;

    @ApiProperty({example: "21.11", description: "Цена продукта"})
    readonly price: number;

    @ApiProperty({description: "Тип продукта"})
    readonly foodType: FoodType;
}