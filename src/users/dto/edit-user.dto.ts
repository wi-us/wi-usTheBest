import { Length } from 'sequelize-typescript';

export class EditUserDto {
    readonly id: number;

    @Length({ max: 64 })
    readonly mail?: string;

    @Length({ max: 16 })
    readonly phone?: string;

    readonly x?: number;
    readonly y?: number;
}
