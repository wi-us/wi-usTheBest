import { ApiProperty } from '@nestjs/swagger';
import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import { Status } from 'src/status/status.model';
import { User } from 'src/users/users.model';
import { Worker } from 'src/worker/worker.model';
import { OrderItem } from './order-item.model';
import { Food } from 'src/food/food.model';

interface IOrderCreationAttrs {
    date: Date;
    status: number;
    price: number;
    user_id: number;
}

@Table({ tableName: 'Order' })
export class Order extends Model<Order, IOrderCreationAttrs> {
    @ApiProperty({ example: '1', description: 'ID заказа' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    // @ApiProperty({example: "1", description: "Id корзины в заказе"})
    // @ForeignKey(() => Basket)
    // @Column({ type: DataType.BIGINT, allowNull: false })
    // basket_ID: number;

    @ApiProperty({ example: '11.11.11', description: 'Дата заказа' })
    @Column({ type: DataType.DATE, allowNull: false })
    date: Date;

    @ApiProperty({ example: '1', description: 'id статуса заказа' })
    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
    @ForeignKey(() => Status)
    status: number;

    @ApiProperty({ example: '1111.23', description: 'Стоимость заказа' })
    @Column({ type: DataType.DECIMAL(8, 2), allowNull: false })
    price: number;

    @ApiProperty({ example: '1', description: 'id юзера который сделал заказ' })
    @Column({ type: DataType.BIGINT, allowNull: false })
    @ForeignKey(() => User)
    user_id: number;

    @ApiProperty({ example: '2', description: 'ID курьера взявшего заказ' })
    @Column({ type: DataType.BIGINT, allowNull: true })
    @ForeignKey(() => Worker)
    worker_ID: number;
    // Define foreign key constraints
    // @BelongsTo(() => Basket)
    // basket: Basket;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Status)
    orderStatus: Status;

    @BelongsTo(() => Worker)
    worker: Worker;

    @ApiProperty({ description: 'Еда в корзине' })
    @BelongsToMany(() => Food, () => OrderItem)
    foods: Food[];

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];
}
