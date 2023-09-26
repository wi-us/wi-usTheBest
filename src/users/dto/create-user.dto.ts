import { ApiProperty } from "@nestjs/swagger";



export class CreateUserDto{
    
    @ApiProperty({example: "785694589034590", description: "Телеграмм чат ID"})
    readonly telegram_ID: number;

   
}