import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateWorkerDto } from 'src/worker/dto/create-worker.dto';


@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @ApiOperation({summary: "Логин"})
    @ApiResponse({status: 200, type: CreateWorkerDto})
    @Post("/login")
    login(@Body() workerDto: CreateWorkerDto ){
        return this.authService.login(workerDto)
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: CreateWorkerDto})
    @Post("/register")
    registration(@Body() workerDto: CreateWorkerDto ){
        return this.authService.registration(workerDto)
    }
}
