import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerStatusDto {
    @ApiProperty({
        description: 'Создание статуса работника',
        example: 'Онлайн',
    })
    description: string;
}
