import { ApiProperty } from '@nestjs/swagger';

export class TakeOrderDto {
    @ApiProperty({
        example: '1',
        description: 'Id заказа который берет работник ',
    })
    orderId: number;
}
