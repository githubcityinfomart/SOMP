import { ContactUsResponseModel } from "../../service-layer/models/ContactUsResponseModel";

export class ContactUsUtility {
    public static getContactUsResponseModel(data: any): ContactUsResponseModel {
        let model = new ContactUsResponseModel();
        model.setId(data._id?.toString());
        model.setFullName(data.fullname);
        model.setPhoneNumber(data.phonenumber);
        model.setInterestedCourse(data.interestedcourse);
        model.setEmail(data.email);
        model.setMessage(data.message);
        model.setStatus(data.status);
        model.setCreatedAt(data.createdAt);
        model.setUpdatedAt(data.updatedAt);
        return model;
    }
}