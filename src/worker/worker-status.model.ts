import { ApiProperty } from '@nestjs/swagger';
import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    HasMany,
} from 'sequelize-typescript';
import { Worker } from './worker.model';

interface IWorkerStatusCreationAttrs {
    description: string;
}

@Table({ tableName: 'Worker_Status' })
export class WorkerStatus extends Model<
    WorkerStatus,
    IWorkerStatusCreationAttrs
> {
    @ApiProperty({ example: '1', description: 'ID Статуса' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Online', description: 'Описание Статуса' })
    @Column({ type: DataType.STRING(30), unique: true })
    description: string;

    @HasMany(() => Worker)
    worker: Worker[];
}
