
import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey } from "sequelize-typescript";
import { Food } from "src/food/food.model";
import { User } from "src/users/users.model";
import { Worker } from "src/worker/worker.model";


interface IBasketCreationAttrs{
    user_ID: number,
    
}


@Table({tableName: "Basket"})
export class Basket extends Model<Basket,IBasketCreationAttrs>{

    @ApiProperty({example: "1", description: "ID корзины"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
      
    @ApiProperty({example: "3000", description: "Стоимость корзины"})
    @Column({ type: DataType.DECIMAL(8, 2), allowNull: true, defaultValue: 0, })
    price: number;

    @ApiProperty({example: "2", description: "ID пользователя"})
    @ForeignKey(() => User)
    @Column({type: DataType.BIGINT, unique: true, allowNull: false })
    user_ID: number;

    

    // Define associations and constraints
    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Food)
    food: Food;
    
}

