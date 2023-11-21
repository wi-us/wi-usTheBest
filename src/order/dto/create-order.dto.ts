import { ApiProperty } from '@nestjs/swagger';

export class createOrderDto {
    // @ApiProperty({
    //     example: '120303.32',
    //     description: 'Цена корзины т.е цена заказа',
    // })
    // price: string;

    @ApiProperty({
        example: '1',
        description: 'ID пользователя который делает заказ',
    })
    user_id: number;
}
