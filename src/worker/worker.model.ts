
import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, PrimaryKey, BelongsTo, ForeignKey, HasOne } from "sequelize-typescript";
import { WorkerStatus } from "./worker-status.model";
import { Role } from "src/roles/roles.model";


interface IWorkerCreationAttrs{
    // role_ID: number,
    email: string,
    password: string,

}


@Table({tableName: "Worker"})
export class Worker extends Model<Worker,IWorkerCreationAttrs>{

    @ApiProperty({example: "1", description: "ID пользователя"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

   
    @ApiProperty({example: "1", description: "ID роли пользователя"})
    @ForeignKey(()=>Role)
    @Column({ type: DataType.BIGINT, allowNull: true })
    role_ID: number;

   
    @ApiProperty({example: "sadna9asda", description: "Пароль пользователя"})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({example: "89111111111", description: "Телефон пользователя"})
    @Column({ type: DataType.STRING(16), allowNull: true })
    phone: string;

    @ApiProperty({example: "user_user@mail.ru", description: "Почта пользователя"})
    @Column({ type: DataType.STRING(64), allowNull: false })
    email: string;

    @ForeignKey(()=>WorkerStatus)
    @ApiProperty({example: "1", description: "На линии или нет"})
    @Column({ type: DataType.BIGINT, allowNull: true })
    status_ID: number;

    @BelongsTo(()=>WorkerStatus)
    status: WorkerStatus; 

    @BelongsTo(()=>Role)
    role: Role; 
}