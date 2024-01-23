import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateWorkerDto {
    @ApiProperty({ example: 'user@user.com', description: 'Email работника' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Не является почтой' })
    email: string;

    @ApiProperty({ example: '123123', description: 'Пароль работника' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Не меньше 4, не больше 16' })
    password: string;
}
