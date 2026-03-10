import { IUserSessionService } from "../../service-layer/interfaces/IUserSessionService";
import { DBManagerFactory } from "../../db-layer/DataAccessLayerFactory";
import { IUserSessionDBManager } from "../../db-layer/interfaces/IUserSessionDBManager";
import { UserSessionResponseModel } from "../../service-layer/models/UserSessionResponseModel";

export class UserSessionService implements IUserSessionService {
    private userSessionDBManager: IUserSessionDBManager;

    constructor() {
        this.userSessionDBManager = DBManagerFactory.getUserSessionDBManager();
    }

    public async createSession(data: UserSessionResponseModel): Promise<Boolean> {
        return await this.userSessionDBManager.createSession(data);
    }

    public async findSessionByUserId(userId: string): Promise<UserSessionResponseModel[]> {
        return await this.userSessionDBManager.findSessionByUserId(userId);
    }

    public async markSessionExpired(sessionId: string): Promise<Boolean> {
        return await this.userSessionDBManager.markSessionExpired(sessionId);

    }

}