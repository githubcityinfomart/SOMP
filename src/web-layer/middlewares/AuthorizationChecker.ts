import { Action, ForbiddenError, UnauthorizedError } from 'routing-controllers';
import { ServiceFactory } from '../../service-layer/ServiceFactory';
import { AppPermission } from '../../service-layer/implementations/JWTTokenService';
import { AccessControlMetaData } from '../../common/utils/AccessControlUtils';
import { UserResponseModel } from '../../service-layer/models/UserResponseModel';

export class AuthorizationChecker {
    private static extractJWTToken(action: Action): string {
        let token: string = action.request.headers['authorization'] || action.request.headers['Authorization'];
        if (!token) return token;
        return token.replace('Bearer', '').trim();
    }


    public async check(action: Action, roles: any[]): Promise<boolean> {
        // Convert roles array into your AccessControlMetaData object
        let data: AccessControlMetaData | undefined = roles?.[0];
        if (data) {
            data = Array.isArray(data) ? data[0] : data;
            if (!data.permissions || data.permissions.length === 0) {
                data.permissions = [AppPermission.Admin]; // default to User-level access
            }
        }

        // Extract token
        const jwtToken: string = AuthorizationChecker.extractJWTToken(action);
        if (!jwtToken) {
            throw new UnauthorizedError('Access token is not provided');
        }

        // Fetch user info
        const user: UserResponseModel = await ServiceFactory.getAuthService().getUser(jwtToken);
        if (!user) {
            throw new UnauthorizedError('Invalid access token');
        }

        // Role/permission check
        if (data?.permissions && (!user.getRole() || !data.permissions.includes(user.getRole() as AppPermission))) {
            throw new ForbiddenError('You do not have permission to access this resource');
        }

        // Attach user to request
        action.request.user = user;
        return true;
    }

    public async getCurrentUser(action: Action): Promise<UserResponseModel> {
        return action.request.user;
    }
}
