import { ApiProperty } from '@nestjs/swagger';
import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    BelongsTo,
    ForeignKey,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import { FoodType } from './food_type.model';
import { Basket } from 'src/basket/basket.model';
import { BasketFood } from 'src/basket/basket-food.model';
import { Order } from 'src/order/order.model';
import { OrderItem } from 'src/order/order-item.model';

interface IFoodCreationAttrs {
    name: string;
    picture: string;
    type_id: number;
    price: number;
}

@Table({ tableName: 'Food' })
export class Food extends Model<Food, IFoodCreationAttrs> {
    @ApiProperty({ example: '1', description: 'ID продукта' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: '2', description: 'Название продукта' })
    @Column({ type: DataType.STRING(32), allowNull: false })
    name: string;

    @ApiProperty({ example: '2', description: 'Ссылка на картинку' })
    @Column({ type: DataType.TEXT, allowNull: false })
    picture: string;

    @ApiProperty({ example: '2', description: 'ID категории продукта' })
    @ForeignKey(() => FoodType)
    @Column({ type: DataType.BIGINT, allowNull: true })
    type_id: number;

    @ApiProperty({ example: '3000', description: 'Стоимость продукта' })
    @Column({ type: DataType.DECIMAL(8, 2), allowNull: false })
    price: number;

    @BelongsTo(() => FoodType)
    foodType: FoodType;

    @BelongsToMany(() => Basket, () => BasketFood)
    baskets: Basket[];

    @HasMany(() => BasketFood)
    basketFood: BasketFood[];

    @BelongsToMany(() => Order, () => OrderItem)
    orders: Order[];

    @HasMany(() => OrderItem)
    order_items: OrderItem[];
}
