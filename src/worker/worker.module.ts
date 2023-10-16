import { Module, forwardRef } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { WorkerStatus } from './worker-status.model';
import { RolesModule } from 'src/roles/roles.module';
import { Worker } from './worker.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService],
  imports:[
    SequelizeModule.forFeature([Worker, Role, WorkerStatus]),
    RolesModule,
    forwardRef(()=>AuthModule),
  ],
  exports:[
    WorkerService,
  ]

})
export class WorkerModule {}
