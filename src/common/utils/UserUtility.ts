import { UserResponseModel } from "../../service-layer/models/UserResponseModel";
import { Utility } from "./Utility";

export class UserUtility extends Utility {
    constructor() {
        super();
    }

    public static getUserResponseModel(data: any): UserResponseModel {
        const model: UserResponseModel = new UserResponseModel();

        model.setId(data?._id ? data._id.toString() : "");

        model.setFirstName(data?.firstName ? data.firstName.trim() : "");
        model.setLastName(data?.lastName ? data.lastName.trim() : "");
        model.setEmail(data?.email ? data.email.trim() : "");

        model.setRole(data?.role ? data.role : "");
        model.setStatus(data?.status ? data.status.trim() : "active");
        model.setPassword(data?.password ? data?.password : "")
        model.setCreatedAt(
            data?.createdAt ? new Date(data.createdAt) : null
        );

        model.setUpdatedAt(
            data?.updatedAt ? new Date(data.updatedAt) : null
        );

        return model;
    }
    public static getUserModelBasicDetails(data: any): UserResponseModel {
        const model: UserResponseModel = new UserResponseModel();

        model.setId(data?._id ? data._id.toString() : "");

        model.setFirstName(data?.firstName ? data.firstName.trim() : "");
        model.setLastName(data?.lastName ? data.lastName.trim() : "");
        model.setEmail(data?.email ? data.email.trim() : "");

        model.setRole(data?.role ? data.role : "");
        model.setStatus(data?.status ? data.status.trim() : "active");
        model.setCreatedAt(
            data?.createdAt ? new Date(data.createdAt) : null
        );

        model.setUpdatedAt(
            data?.updatedAt ? new Date(data.updatedAt) : null
        );

        return model;
    }
}
