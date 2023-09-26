
import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, PrimaryKey } from "sequelize-typescript";


interface IWorkerCreationAttrs{
    role_ID: number,
    login: string,
    password: string,

}


@Table({tableName: "Worker"})
export class Worker extends Model<Worker,IWorkerCreationAttrs>{

    @ApiProperty({example: "1", description: "ID пользователя"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "1", description: "ID роли пользователя"})
    @Column({ type: DataType.BIGINT, allowNull: false })
    role_ID: number;

    @ApiProperty({example: "usser_user", description: "Логин пользователя"})
    @Column({ type: DataType.STRING(32), allowNull: false })
    login: string;

    @ApiProperty({example: "sadna9asda", description: "Пароль пользователя"})
    @Column({ type: DataType.STRING(32), allowNull: false })
    password: string;

    @ApiProperty({example: "89111111111", description: "Телефон пользователя"})
    @Column({ type: DataType.STRING(16), allowNull: true })
    phone: string;

    @ApiProperty({example: "user_user@mail.ru", description: "Почта пользователя"})
    @Column({ type: DataType.STRING(64), allowNull: true })
    mail: string;
}