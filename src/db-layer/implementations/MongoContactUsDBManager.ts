import mongoose from "mongoose";
import { IContactUsDBManager } from "../../db-layer/interfaces/IContactUsDBManager";
import { DBConstants } from "../../db-layer/models/DBConstants";
import { DBContactUsSchema } from "../../db-layer/models/DBContactUs";
import { ContactUsResponseModel } from "../../service-layer/models/ContactUsResponseModel";
import { ContactUsUtility } from "../../common/utils/ContactUsUtility";
import { ObjectStatus } from "../../service-layer/models/ServiceObject";
import { Utility } from "../../common/utils/Utility";

export class MongoContactUsDBManager implements IContactUsDBManager {
    private contactUsDB: any;

    constructor() {
        this.contactUsDB = mongoose.model(DBConstants.ContactUsCollection, DBContactUsSchema);
    }

    public async createContactUs(data: ContactUsResponseModel): Promise<ContactUsResponseModel> {
        let db = new this.contactUsDB(data);
        let ret = await db.save();
        return ContactUsUtility.getContactUsResponseModel(ret);
    }

    public async getContactUsById(contactUsId: string): Promise<ContactUsResponseModel> {
        let ret = await this.contactUsDB.findById(contactUsId);
        if (!ret) {
            return null;
        }
        return ContactUsUtility.getContactUsResponseModel(ret);
    }

   public async getContactUsList(page: number, limit: number): Promise<{ data: ContactUsResponseModel[], total: number }> {
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
        this.contactUsDB.find({ status: { $ne: ObjectStatus.Deleted } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        this.contactUsDB.countDocuments({ status: { $ne: ObjectStatus.Deleted } })
    ]);

    if (!entries) return { data: [], total: 0 };

    const data = Utility.getListOfItems(entries, ContactUsUtility.getContactUsResponseModel);
    return { data, total };
}

    public async updateContactUs(contactUsId: string, data: ContactUsResponseModel): Promise<ContactUsResponseModel> {
        const entry = await this.contactUsDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(contactUsId) },
            {
                $set: {
                    full_name: data.getFullName(),
                    phone_number: data.getPhoneNumber(),
                    interested_course: data.getInterestedCourse(),
                    message: data.getMessage(),
                    status: data.getStatus(),
                }
            },
            { new: true }
        );
        if (!entry) {
            return null;
        }
        return ContactUsUtility.getContactUsResponseModel(entry);
    }

    public async deleteContactUsById(contactUsId: string): Promise<ContactUsResponseModel> {
        const entry = await this.contactUsDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(contactUsId) },
            { $set: { status: ObjectStatus.Deleted } },
            { new: true }
        );
        if (!entry) {
            return null;
        }
        return ContactUsUtility.getContactUsResponseModel(entry);
    }
}