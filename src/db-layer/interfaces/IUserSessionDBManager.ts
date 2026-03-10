import { UserSessionResponseModel } from "../../service-layer/models/UserSessionResponseModel";

export interface IUserSessionDBManager {
    createSession(data: UserSessionResponseModel): Promise<Boolean>;
    findSessionByUserId(userId: string): Promise<UserSessionResponseModel[]>;
    markSessionExpired(sessionId: string): Promise<Boolean>;
}