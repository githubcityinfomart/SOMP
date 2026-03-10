import { DBManagerFactory } from "../../db-layer/DataAccessLayerFactory";
import { IUserDBManager } from "../../db-layer/interfaces/IUserDBManager";
import { IUserService } from "../../service-layer/interfaces/IUserService";
import { UserResponseModel } from "../../service-layer/models/UserResponseModel";
import { AppPermission } from "./JWTTokenService";

export class UserService implements IUserService {
    private readonly userDBManager: IUserDBManager;

    constructor() {
        this.userDBManager = DBManagerFactory.getUserDBManager();
    }

    public async register(data: UserResponseModel): Promise<UserResponseModel> {
        return await this.userDBManager.register(data)
    }
    public async getUserByEmail(email: string): Promise<UserResponseModel> {
        return await this.userDBManager.getUserByEmail(email)
    }
    public async getUserByRole(role: AppPermission): Promise<UserResponseModel> {
        return await this.userDBManager.getUserByRole(role)
    }
    public async getUserDetailsById(userId: string): Promise<UserResponseModel> {
        return await this.userDBManager.getUserDetailsById(userId)
    }
    public async deleteUserById(userId: string): Promise<UserResponseModel> {
        return await this.userDBManager.deleteUserById(userId)
    }
    public async getUsersList(): Promise<UserResponseModel[]> {
        return await this.userDBManager.getUsersList()
    }

}