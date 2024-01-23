import { ApiProperty } from '@nestjs/swagger';

export class addRoleDto {
    @ApiProperty({ example: 'BASIC', description: 'Значение роли' })
    readonly value: string;

    @ApiProperty({ example: '2', description: 'ID работника' })
    readonly workerID: number;
}
