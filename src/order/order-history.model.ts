
import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, PrimaryKey, HasOne } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Worker } from "src/worker/worker.model";

interface IOrderCreationAttrs{
    date: Date,
    total_price: number,
    user_id: number,
}


@Table({ tableName: "OrderHistory" })
export class OrderHistory extends Model<OrderHistory, IOrderCreationAttrs> {

    @ApiProperty({example: "1", description: "ID заказа"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // @ApiProperty({example: "1", description: "Id корзины в заказе"})
    // @ForeignKey(() => Basket)
    // @Column({ type: DataType.BIGINT, allowNull: false })
    // basket_ID: number;

    @ApiProperty({example: "11.11.11", description: "Дата окончания заказа"})
    @Column({ type: DataType.DATE, allowNull: false })
    date: Date;

    @ApiProperty({example: "1111.23", description: "Стоимость заказа"})
    @Column({ type: DataType.DECIMAL(8, 2), allowNull: false })
    total_price: number;

    @ApiProperty({example: "1", description: "id юзера который сделал заказ"})
    @Column({ type: DataType.BIGINT, allowNull: false })
    @ForeignKey(()=> User)
    user_id: Number

    @ApiProperty({example: "2", description: "ID курьера доставившего"})
    @Column({type: DataType.BIGINT, allowNull: false})
    @ForeignKey(()=> Worker)
    worker_ID: number;
    // Define foreign key constraints
    // @BelongsTo(() => Basket)
    // basket: Basket;

    @BelongsTo(()=>User)
    user: User;

    @BelongsTo(()=> Worker)
    worker: Worker;
}