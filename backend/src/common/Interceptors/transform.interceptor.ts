import { Injectable,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, timestamp } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): 
    Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                status: 'success',
                data,
                timestamp: new Date().toISOString(),
            })),
        );
    }
}