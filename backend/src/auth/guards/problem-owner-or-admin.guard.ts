import { Injectable,CanActivate,ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ProblemsService } from "src/problems/problems.service";
import { UserRole } from "src/users/entity/user.entity";

@Injectable()
export class ProblemOwnerOrAdminGuard implements CanActivate {
    
    constructor(private problemsService: ProblemsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const problemId = request.params.id;

        if (user && user.role === UserRole.GOVERNMENT){
            return true;
        }

        if (user && problemId){
            const newProblem = await this.problemsService.findOne(problemId);
            return newProblem && newProblem.user_id === user.id;
        }

        return false;
    }
}