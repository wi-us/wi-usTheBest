
import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, PrimaryKey, HasMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Worker } from "src/worker/worker.model";


interface IRoleCreationAttrs{
    description: string,
    value: string,
}


@Table({tableName: "Role"})
export class Role extends Model<Role,IRoleCreationAttrs>{

    @ApiProperty({example: "1", description: "ID роли"})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Администратор", description: "Описание роли"})
    @Column({ type: DataType.STRING(32), allowNull: false })
    description: string;

    @ApiProperty({example: "ADMIN", description: "Значение роли"})
    @Column({ type: DataType.STRING(32), allowNull: false, unique: true, })
    value: string;

    @HasMany(()=>Worker)
    workers: Worker[];
  
}