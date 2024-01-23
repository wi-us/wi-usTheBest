import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const WorkerDeco = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.worker;
    },
);

export class ReqWorkerInfo {
    email: string;
    id: number;
    role: {
        id: number;
        description: string;
        value: string;
        createdAt: Date;
        updatedAt: Date;
    };
    iat: number;
    exp: number;
}
