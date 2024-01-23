import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiOperation,
    ApiProperty,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateWorkerDto } from 'src/worker/dto/create-worker.dto';

class ResponseAuthToken {
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpZCI6IjEiLCJyb2xlIjp7ImlkIjoiMSIsImRlc2NyaXB0aW9uIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJ2YWx1ZSI6IkFETUlOIiwiY3JlYXRlZEF0IjoiMjAyMy0xMi0wNVQxMzoyNzoxNS4wMTlaIiwidXBkYXRlZEF0IjoiMjAyMy0xMi0wNVQxMzoyNzoxNS4wMTlaIn0sImlhdCI6MTcwMTc4MzAyOCwiZXhwIjoxNzAxODY5NDI4fQ.MS-KVGQnQOKisyI_DMC8TKRcJ1VO3VhPCqj-pYVLQsM',
    })
    token: string;
}

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Логин' })
    @ApiResponse({
        status: 200,
        description: 'Successful register',
        type: ResponseAuthToken,
    })
    @Post('/login')
    login(@Body() workerDto: CreateWorkerDto) {
        console.log(workerDto, 'worker');
        return this.authService.login(workerDto);
    }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({
        status: 201,
        description: 'Successful register',
        type: 'string',
    })
    @Post('/register')
    registration(@Body() workerDto: CreateWorkerDto) {
        return this.authService.registration(workerDto);
    }
}
