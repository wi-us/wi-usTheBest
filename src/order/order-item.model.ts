import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey, BelongsToMany } from "sequelize-typescript";
import { Food } from "src/food/food.model";
import { User } from "src/users/users.model";
import { Worker } from "src/worker/worker.model";
import { OrderHistory } from "./order-history.model";





@Table({tableName: "OrderItem", createdAt: false, updatedAt: false,})
export class OrderItem extends Model<OrderItem>{

    @ApiProperty({example: "1", description: "ID "})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
      
    @ApiProperty({example: "3000", description: "Стоимость корзины"})
    @ForeignKey(() => OrderHistory)
    @Column({type: DataType.BIGINT})
    order_ID: number;

    @ApiProperty({example: "2", description: "ID пользователя"})
    @ForeignKey(() => Food)
    @Column({type: DataType.BIGINT})
    food_ID: number;

    @ApiProperty({example: "2", description: "ID пользователя"})
    @Column({type: DataType.BIGINT})
    quantity: number;

    
    
}

