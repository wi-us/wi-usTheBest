import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodTypeDto {
    @ApiProperty({ example: 'ФастФуд' })
    readonly type: string;
}
