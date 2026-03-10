// external imports
import { ValidationError, validate } from 'class-validator';
import jwt from "jwt-simple";
import { TAlgorithm } from "jwt-simple";

// our imports
import { Config } from "../../config/config";
import { ServiceFactory } from '../../service-layer/ServiceFactory';
import { JWTTokenClaims } from '../../service-layer/models/JWTTokenClaims';
import mongoose from 'mongoose';
import { IUserService } from 'service-layer/interfaces/IUserService';
import { IAuthService } from 'service-layer/interfaces/IAuthService';
import { UserResponseModel } from 'service-layer/models/UserResponseModel';
export class AuthService implements IAuthService {
    private static Algorithm: TAlgorithm = "HS256";

    private readonly usersService: IUserService;
    private readonly config: Config;

    constructor() {
        this.usersService = ServiceFactory.getUserService();

        this.config = Config.getInstance();
    }

    public async getUser(jwtToken: string, skipExpiry?: boolean): Promise<UserResponseModel> {
        const claims: JWTTokenClaims = await this.getClaims(jwtToken, skipExpiry);
        if (!claims) {
            return null;
        }


        let user: UserResponseModel = await this.usersService.getUserDetailsById(claims.getUserId());
        if (!user) {
            return null;
        }
        // if (claims.getRole()) {
        //     user.setRole(claims.getRole());
        // }
        return user;
    }

    private async getClaims(jwtToken: string, skipExpiry: boolean): Promise<JWTTokenClaims> {
        const decodedPayload = jwt.decode(
            jwtToken,
            Config.getInstance().getSecretKey(),
            true,
            AuthService.Algorithm
        );
        return AuthService.fromJWTPayload(decodedPayload, skipExpiry);
    }

    private static async fromJWTPayload(payload: any, skipExpiry?: boolean): Promise<JWTTokenClaims | undefined> {
        const expiresAt: number = payload.exp;
        const expiresIn: number = Math.floor((expiresAt * 1000 - Date.now()) / 1000);

        const checkExpiry = skipExpiry ? false : true;
        if (expiresIn <= 0 && checkExpiry) {
            return undefined; // token expired
        }

        let userId: any = await ServiceFactory.getEncryptionService().decrypt(payload.aud);
        userId = new mongoose.Types.ObjectId(userId).toString();

        const claims: JWTTokenClaims = new JWTTokenClaims(userId, expiresIn);

        claims.setExpiresAt(expiresAt);

        if (payload.role) {
            claims.setRole(payload.role);
        }


        const errors: ValidationError[] = await validate(claims);
        if (errors.length > 0 && checkExpiry) {
            return undefined;
        }
        return claims;
    }


}