import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, PrimaryKey, BelongsTo, ForeignKey } from "sequelize-typescript";
import { FoodType } from "./food_type.model";
import { Basket } from "src/basket/basket.model";


interface IFoodCreationAttrs{
    name: string,
    picture: string,
    food_type_ID: number,
    price: number,
    
}


@Table({tableName: "Food"})
export class Food extends Model<Food,IFoodCreationAttrs>{

    @ApiProperty({example: "1", description: "ID продукта"})
    @ForeignKey(()=>Basket)
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "2", description: "Название продукта"})
    @Column({ type: DataType.STRING(32), allowNull: false })
    name: string;

    @ApiProperty({example: "2", description: "Ссылка на картинку"})
    @Column({ type: DataType.STRING(128), allowNull: false })
    pricture: string;

    @ApiProperty({example: "2", description: "ID категории продукта"})
    @ForeignKey(()=>FoodType)
    @Column({ type: DataType.BIGINT, allowNull: false })
    type_id: number;

    @ApiProperty({example: "3000", description: "Стоимость продукта"})
    @Column({ type: DataType.DECIMAL(8, 2), allowNull: false })
    price: number;
    
    @BelongsTo(() => FoodType)
    foodType: FoodType;
}