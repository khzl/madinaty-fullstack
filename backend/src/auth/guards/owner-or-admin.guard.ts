import { 
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException
}
from "@nestjs/common";
import { Observable } from "rxjs";
import { User, UserRole } from "src/users/entity/user.entity";

@Injectable()
export class OwnerOrAdminGuard implements CanActivate{
    canActivate(
        context: ExecutionContext,
    ): 
    boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const authenticatedUser = request.user as {
            id: number,
            role: UserRole;
        };

        if (!authenticatedUser){
            throw new ForbiddenException('Authentication Required');
        }

        const targetUserId = parseInt(request.params.id,10);

        const isOwner = authenticatedUser.id === targetUserId;
        const isAdmin = authenticatedUser.role === UserRole.GOVERNMENT;

        if(isOwner || isAdmin){
            return true; // access granted 
        }

        throw new ForbiddenException('You Do Not Have Permission To Access Or Modify This Resource.');
    }
}