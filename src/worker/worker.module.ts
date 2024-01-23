import { Module, forwardRef } from '@nestjs/common';
import { WorkerController, WorkerStatusController } from './worker.controller';
import { WorkerService } from './worker.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { WorkerStatus } from './worker-status.model';
import { RolesModule } from 'src/roles/roles.module';
import { Worker } from './worker.model';
import { AuthModule } from 'src/auth/auth.module';
import { OrderModule } from 'src/order/order.module';

@Module({
    controllers: [WorkerController, WorkerStatusController],
    providers: [WorkerService],
    imports: [
        SequelizeModule.forFeature([Worker, WorkerStatus, Role]),
        RolesModule,
        OrderModule,
        forwardRef(() => AuthModule),
    ],
    exports: [WorkerService],
})
export class WorkerModule {}
