import { ApiProperty } from '@nestjs/swagger';

export class FormattedFoodDto {
    @ApiProperty({ example: 'Пицца', description: 'Food Name' })
    name: string;

    @ApiProperty({ example: 21.11, description: 'Food Price' })
    price: number;

    @ApiProperty({ example: 9, description: 'Quantity' })
    quantity: number;

    @ApiProperty({ example: 189.99, description: 'Total Price for the food' })
    totalPrice: number;
}

export class FormattedBasketDto {
    @ApiProperty({ example: 3, description: 'Basket ID' })
    id: number;

    @ApiProperty({ example: 249.1, description: 'Basket Price' })
    price: number;

    @ApiProperty({ example: 12, description: 'User ID' })
    user_ID: number;

    @ApiProperty({
        type: [FormattedFoodDto],
        description: 'List of foods in the basket',
    })
    foods: FormattedFoodDto[];
}
