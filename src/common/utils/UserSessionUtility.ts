import { UserSessionResponseModel } from "../../service-layer/models/UserSessionResponseModel";
import { Utility } from "./Utility";

export class UserSessionUtility extends Utility {
    constructor() {
        super();
    }

    public static getUserSessionResponseModel(data: any): UserSessionResponseModel {
        const model: UserSessionResponseModel = new UserSessionResponseModel();

        model.setId(data?._id ? data._id.toString() : "");

        model.setUserId(
            data?.userId
                ? data.userId.toString()
                : ""
        );

        model.setToken(data?.token ? data.token : "");
        model.setIsExpired(data?.isExpired ?? false);

        model.setCreatedAt(
            data?.createdAt ? new Date(data.createdAt) : null
        );

        model.setUpdatedAt(
            data?.updatedAt ? new Date(data.updatedAt) : null
        );

        return model;
    }


}
