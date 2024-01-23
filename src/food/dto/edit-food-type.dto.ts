import { ApiProperty } from '@nestjs/swagger';

export class EditFoodTypeDto {
    @ApiProperty({
        example: 'Фастфуд',
        description: 'Название категории продукта',
    })
    readonly type: string;
}
