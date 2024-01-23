import { ApiProperty } from '@nestjs/swagger';

export class CreateBasketDto {
    @ApiProperty({
        example: '1',
        description: 'ID пользователя для свзяи с корзиной',
    })
    readonly user_ID: number;
}
