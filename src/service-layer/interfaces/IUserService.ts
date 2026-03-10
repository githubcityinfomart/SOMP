import { AppPermission } from "../../service-layer/implementations/JWTTokenService";
import { UserResponseModel } from "../../service-layer/models/UserResponseModel";

export interface IUserService {
    register(data: UserResponseModel): Promise<UserResponseModel>
    getUserByEmail(email: string): Promise<UserResponseModel>
    getUserByRole(role: AppPermission): Promise<UserResponseModel>
    getUserDetailsById(userId: string): Promise<UserResponseModel>
    deleteUserById(userId: string): Promise<UserResponseModel>
    getUsersList(): Promise<UserResponseModel[]>
}