import { Module } from '@nestjs/common';
import { PaymentController, UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { BasketModule } from 'src/basket/basket.module';

@Module({
    controllers: [UsersController, PaymentController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User]), BasketModule],
    exports: [UsersService],
})
export class UsersModule {}
