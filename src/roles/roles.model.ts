
import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, PrimaryKey } from "sequelize-typescript";


interface IRoleCreationAttrs{
    role_name: string,

}


@Table({tableName: "Role"})
export class Role extends Model<Role,IRoleCreationAttrs>{

    @ApiProperty({example: "1", description: "ID роли"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Админ", description: "Название роли"})
    @Column({ type: DataType.STRING(32), allowNull: false })
    role_name: string;

  
}