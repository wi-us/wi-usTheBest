import { ApiProperty } from "@nestjs/swagger";



export class addItemToCartDto{
    
    @ApiProperty({example: "1", description: " ID пользователя для добавления в корзину"})
    readonly user_ID: number;

    @ApiProperty({example: "Пицца", description: "foodName для добавления в корзину "})
    readonly foodName: string;
   
}

