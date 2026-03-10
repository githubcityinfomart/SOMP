import { UserResponseModel } from "../../service-layer/models/UserResponseModel";

export interface IAuthService {
    getUser(jwtToken: string, skipExpiry?: boolean): Promise<UserResponseModel>;
}