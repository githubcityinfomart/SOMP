import { UserSessionUtility } from "../../common/utils/UserSessionUtility";
import { Utility } from "../../common/utils/Utility";
import { IUserSessionDBManager } from "../../db-layer/interfaces/IUserSessionDBManager";
import { DBConstants } from "../../db-layer/models/DBConstants";
import { DBUserSessionSchema } from "../../db-layer/models/DBUserSessionSchema";
import mongoose, { model } from "mongoose";
import { UserSessionResponseModel } from "../../service-layer/models/UserSessionResponseModel";



export class MongoUserSessionDBManager implements IUserSessionDBManager {

    private userSession: any;
    constructor() {
        this.userSession = model(DBConstants.UserSessionCollection, DBUserSessionSchema);
    }

    public async createSession(data: UserSessionResponseModel): Promise<Boolean> {
        const model = new this.userSession(data);
        const ret = await model.save()
        if (ret) {
            return true;
        }
        return false;
    }

    public async findSessionByUserId(userId: string): Promise<UserSessionResponseModel[]> {
        const ret = await this.userSession.find({ userId });
        if (ret && ret[0]) {
            return Utility.getListOfItems(ret, UserSessionUtility.getUserSessionResponseModel);
        }
        return [];
    }

    public async markSessionExpired(sessionId: string): Promise<Boolean> {
        const ret = await this.userSession.findOneAndUpdate({ _id: sessionId }, {
            isExpired: true
        })
        if (ret) {
            return true
        }
        return false;
    }

}