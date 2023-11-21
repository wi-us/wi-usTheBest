import { ApiProperty } from '@nestjs/swagger';

export class createOrderStatusDto {
    @ApiProperty({
        example: 'Активный',
        description: 'Тип заказа',
    })
    type: string;
}
