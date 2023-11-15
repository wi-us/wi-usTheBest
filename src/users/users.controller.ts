import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';


@ApiTags("Пользователи")
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @ApiOperation({summary: "Создание пользователя "})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }
    
    @ApiOperation({summary: "Получение всех пользователей "})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll(){
        return this.userService.getUsers()
    }

    @ApiOperation({summary: "Получить пользователя по ID"})
    @ApiResponse({status: 200, type: User})
    @Get("/:id")
    getById(@Param("id") id){
        return this.userService.getUserById(id)
    }

    @ApiOperation({summary: "Получить пользователя по telegram ID"})
    @ApiResponse({status: 200, type: User})
    @Get("/:tgId")
    getByTelegramId(@Param("tgId") telegramId: string){
        return this.userService.getUserByTelegramId(telegramId)
    }

}
