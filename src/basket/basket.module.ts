import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { Basket } from './basket.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports:[
    
    SequelizeModule.forFeature([Basket]),
    
  ],
})
export class BasketModule {}
