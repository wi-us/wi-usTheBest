
import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey } from "sequelize-typescript";
import { Food } from "./food.model";

interface IFoodTypeCreationAttrs{
    type: string,
}


@Table({ tableName: "Food_Type" })
export class FoodType extends Model<FoodType, IFoodTypeCreationAttrs> {

    @ApiProperty({example: "1", description: "ID категории продукта"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Фастфуд", description: "Название категории продукта"})
    @Column({ type: DataType.STRING(255), allowNull: false })
    type: string;

    @HasMany(()=>Food)
    food: Food[];

}