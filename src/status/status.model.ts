import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey } from "sequelize-typescript";


interface IStatusCreationAttrs{
    type: string,
}

@Table({ tableName: "Status" })
export class Status extends Model<Status, IStatusCreationAttrs> {

    @ApiProperty({example: "1", description: "ID статуса"})
    @PrimaryKey
    @Column({ type: DataType.BIGINT })
    id: number;

    @ApiProperty({example: "В пути", description: "Статус заказа"})
    @Column({ type: DataType.STRING(32), allowNull: false })
    type: string;

    // No associations or constraints in this example
}