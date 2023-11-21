import { ApiProperty } from '@nestjs/swagger';

export class FormattedFoodDto {
    @ApiProperty({ example: 'Пицца', description: 'Food Name' })
    name: string;

    @ApiProperty({ example: '21.11', description: 'Food Price' })
    price: string;

    @ApiProperty({ example: '9', description: 'Quantity' })
    quantity: string;

    @ApiProperty({ example: '189.99', description: 'Total Price for the food' })
    totalPrice: string;
}

export class FormattedBasketDto {
    @ApiProperty({ example: '3', description: 'Basket ID' })
    id: string;

    @ApiProperty({ example: '249.10', description: 'Basket Price' })
    price: string;

    @ApiProperty({ example: '12', description: 'User ID' })
    user_ID: string;

    @ApiProperty({
        type: [FormattedFoodDto],
        description: 'List of foods in the basket',
    })
    foods: FormattedFoodDto[];
}
