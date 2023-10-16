import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Worker } from './worker.model';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';


@Injectable()
export class WorkerService {
   
    constructor(
        @InjectModel(Worker) private workerRepository: typeof Worker,
        private roleService: RolesService
    ){}



    async addRole(dto: addRoleDto) {
        const worker = await this.workerRepository.findByPk(dto.workerID);
        const role = await this.roleService.getRoleByValue(dto.value);
        if(role&&worker){
            await worker.$set("role", [role.id]);
            return dto;
        }
        
        
        throw new HttpException("ПОользователь или роль не найдены", HttpStatus.NOT_FOUND)
    }

    async createWorker(dto: CreateWorkerDto){
        
        //Creating worker
        const worker = await this.workerRepository.create(dto);
        const role = await this.roleService.getRoleByValue("BASIC")
        await worker.$set("role", [role.id])
        worker.role = role
        return worker
    }

   
    async getWorkerById(id: number){

        const worker = await this.workerRepository.findByPk(id)

        if(!worker){
            return 
        }

        return worker;
   }

    async getWorkers(){
        const workers = await this.workerRepository.findAll()
        return workers;
    }

    async getWorkerByEmail(email: string){
        const worker = await this.workerRepository.findOne({where:{email}, include: {all: true}})
        return worker;
    }
}
