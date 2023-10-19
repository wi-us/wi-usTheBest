import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey, BelongsToMany } from "sequelize-typescript";
import { Food } from "src/food/food.model";
import { User } from "src/users/users.model";
import { Worker } from "src/worker/worker.model";
import { Basket } from "./basket.model";




@Table({tableName: "BasketFood", createdAt: false, updatedAt: false,})
export class BasketFood extends Model<BasketFood>{

    @ApiProperty({example: "1", description: "ID корзины"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
      
    @ApiProperty({example: "3000", description: "Стоимость корзины"})
    @ForeignKey(() => Basket)
    @Column({type: DataType.BIGINT})
    basket_ID: number;

    @ApiProperty({example: "2", description: "ID пользователя"})
    @ForeignKey(() => Food)
    @Column({type: DataType.BIGINT})
    food_ID: number;

    
    
}

