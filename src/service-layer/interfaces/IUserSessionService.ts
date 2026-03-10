import { UserSessionResponseModel } from "service-layer/models/UserSessionResponseModel";

export interface IUserSessionService {
    createSession(data: UserSessionResponseModel): Promise<Boolean>;
    findSessionByUserId(userId: string): Promise<UserSessionResponseModel[]>;
    markSessionExpired(sessionId: string): Promise<Boolean>;
}