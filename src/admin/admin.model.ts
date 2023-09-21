import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, PrimaryKey } from "sequelize-typescript";

interface IAdminCreationAttrs{
    login: string,
    password: string,
}

@Table({ tableName: "Admin" })
export class Admins extends Model<Admins, IAdminCreationAttrs> {

    @ApiProperty({example: "1", description: "ID админа"})
    @PrimaryKey
    @Column({ type: DataType.BIGINT})
    id: number;

    @ApiProperty({example: "light_light", description: "Логин админа"})
    @Column({ type: DataType.STRING(32), allowNull: false, unique: true})
    login: string;

    @ApiProperty({example: "13423423asdasdAasd", description: "Пароль админа"})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

}