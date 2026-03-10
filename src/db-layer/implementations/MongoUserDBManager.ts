import mongoose from "mongoose";
import { IUserDBManager } from "../../db-layer/interfaces/IUserDBManager";
import { DBConstants } from "../../db-layer/models/DBConstants";
import { DBUsersSchema } from "../../db-layer/models/DBUser";
import { UserResponseModel } from "../../service-layer/models/UserResponseModel";
import { UserUtility } from "../../common/utils/UserUtility";
import { AppPermission } from "../../service-layer/implementations/JWTTokenService";
import { Utility } from "../../common/utils/Utility";
import { ObjectStatus } from "../../service-layer/models/ServiceObject";

export class MongoUserDBManager implements IUserDBManager {
    private userDB: any;

    constructor() {
        this.userDB = mongoose.model(DBConstants.UsersCollection, DBUsersSchema);
    }

    public async register(data: UserResponseModel): Promise<UserResponseModel> {
        let db = new this.userDB(data);
        let ret = await db.save();
        return UserUtility.getUserModelBasicDetails(ret);
    }

    public async getUserByEmail(email: string): Promise<UserResponseModel> {
        let ret = await this.userDB.findOne({
            email: email.toLowerCase()
        });
        if (ret) {
            return UserUtility.getUserResponseModel(ret);
        }
        return null;

    }
    public async getUserByRole(role: AppPermission): Promise<UserResponseModel> {
        let ret = await this.userDB.findOne({
            role: role
        });
        if (ret) {
            return UserUtility.getUserModelBasicDetails(ret);
        }
        return null;

    }

    public async getUserDetailsById(id: string): Promise<UserResponseModel> {
        let user = await this.userDB.findById(id);
        if (!user) {
            return null;
        }
        const userDetails = UserUtility.getUserModelBasicDetails(user);

        return userDetails

    }
    public async deleteUserById(id: string): Promise<UserResponseModel> {
        const user = await this.userDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: { status: ObjectStatus.Deleted } },
            { new: true }
        ); if (!user) {
            return null;
        }
        const userDetails = UserUtility.getUserModelBasicDetails(user);
        return userDetails

    }

    public async getUsersList(): Promise<UserResponseModel[]> {
        let user = await this.userDB.find({
            status: 'active'
        });
        if (!user) {
            return null;
        }
        const userDetails = Utility.getListOfItems(user, UserUtility.getUserModelBasicDetails);
        return userDetails

    }
}