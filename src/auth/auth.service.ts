import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateWorkerDto } from 'src/worker/dto/create-worker.dto';
import { WorkerService } from 'src/worker/worker.service';
import * as bcrypt from "bcryptjs"
import { Worker } from 'src/worker/worker.model';


@Injectable()
export class AuthService {

    constructor(
        private workerService: WorkerService,
        private jwtService: JwtService
        ){}

    async login(workerDto: CreateWorkerDto ){
       const worker = await this.validateWorker(workerDto)
       return this.generateToken(worker)
    }
    

  
    async registration(workerDto: CreateWorkerDto ){
        const candidate = await this.workerService.getWorkerByEmail(workerDto.email);
        if(candidate){
            throw new HttpException("Работник с таким email существует", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(workerDto.password, 5)
        const worker = await this.workerService.createWorker({...workerDto, password: hashPassword})
        return this.generateToken(worker)

    }

    private async generateToken(worker: Worker){
        const payload = {email: worker.email, id: worker.id, role: worker.role}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateWorker(workerDto: CreateWorkerDto) {
        const worker = await this.workerService.getWorkerByEmail(workerDto.email);
        const passwordEquals = await bcrypt.compare(workerDto.password, worker.password)
        if(worker && passwordEquals){
            return worker
        }

        throw new UnauthorizedException({message: "Некорректная почта или пароль"})
    }
   
}
