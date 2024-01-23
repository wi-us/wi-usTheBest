import { ApiProperty } from '@nestjs/swagger';

export class EditWorkerStatusDto {
    @ApiProperty({ example: 'Онлайн', description: 'Статус работника' })
    description: string;
}
