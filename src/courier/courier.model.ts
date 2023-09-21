import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, PrimaryKey, BelongsTo } from "sequelize-typescript";
import { Order } from "src/order/order.model";


interface IСourierCreationAttrs{
    login: string,
    password: string,
  
}

@Table({tableName: "Сourier"})
export class Сourier extends Model<Сourier,IСourierCreationAttrs>{

    @ApiProperty({example: "1", description: "ID корзины"})
    @PrimaryKey
    @Column({ type: DataType.BIGINT})
    id: number;
    
    @ApiProperty({example: "2", description: "Логин курьера"})
    @Column({ type: DataType.STRING(32), allowNull: false, unique: true,})
    login: string;

    @ApiProperty({example: "12314124", description: "Пароль курьера"})
    @Column({ type: DataType.STRING(32), allowNull: false })
    password: string;
    
    @ApiProperty({example: "3,2,1,1", description: "IDs завершенных заказов"})
    @Column({ type: DataType.BIGINT, allowNull: true })
    finished_Order_ID: number;
   
    @BelongsTo(() => Order, 'finished_Order_ID')
    finishedOrder: Order;
    
}

