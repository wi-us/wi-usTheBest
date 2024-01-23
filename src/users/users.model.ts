import { ApiProperty } from '@nestjs/swagger';
import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    HasOne,
} from 'sequelize-typescript';
import { Basket } from 'src/basket/basket.model';

interface IUserCreationAttrs {
    telegram_ID: number;
}

@Table({ tableName: 'User' })
export class User extends Model<User, IUserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'ID пользователя' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: '785694589034590',
        description: 'Телеграмм ID пользователя',
    })
    @Column({ type: DataType.BIGINT, allowNull: false })
    telegram_ID: number;

    @ApiProperty({
        example: '59.6599596',
        description: 'Координаты пользователя по x',
    })
    @Column({ type: DataType.DECIMAL(11, 8), allowNull: true })
    x: string;

    @ApiProperty({
        example: '49.5949594',
        description: 'Координаты пользователя по y',
    })
    @Column({ type: DataType.DECIMAL(11, 8), allowNull: true })
    y: string;

    @ApiProperty({
        example: '89111111111',
        description: 'Телефон пользователя',
    })
    @Column({ type: DataType.STRING(16), allowNull: true })
    phone: string;

    @ApiProperty({
        example: 'user_user@mail.ru',
        description: 'Почта пользователя',
    })
    @Column({ type: DataType.STRING(64), allowNull: true })
    mail: string;

    @ApiProperty({
        example: 20000,
        description: 'Баланс',
    })
    @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0 })
    balance: number;

    @HasOne(() => Basket)
    basket: Basket;

    // @AfterCreate
    // static linkBasket(insance: User){}
}
