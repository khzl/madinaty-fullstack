import { 
    createParamDecorator, 
    ExecutionContext,
    InternalServerErrorException, 
} from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';

export const CurrentUser = createParamDecorator(
    (data: keyof User | undefined, ctx: ExecutionContext) => { 
        const request = ctx.switchToHttp().getRequest();
        const user: User = request.user;

        if (!user) {
            throw new InternalServerErrorException(
                'CurrentUser decorator requires an active AuthGuard (e.g., JwtAuthGuard) to attach the user to the request.',
            );
        }

        if (data) {
            if (user[data] !== undefined) {
                return user[data];
            } else {
                 throw new InternalServerErrorException(
                    `Property "${data.toString()}" not found on the authenticated User object.`
                );
            }
        }
        return user;
    },
);
