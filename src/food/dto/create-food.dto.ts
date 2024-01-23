import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto {
    @ApiProperty({ example: 'Пицца', description: 'Название продукта' })
    readonly name: string;

    @ApiProperty({
        example: 'https://example.com/api/1.jpg',
        description: 'Ссылка на картинку продукта',
    })
    readonly picture: string;

    @ApiProperty({ example: 'Фастфуд', description: 'тип продукта' })
    readonly type: string;

    @ApiProperty({ example: '21.11', description: 'Цена продукта' })
    readonly price: number;
}
