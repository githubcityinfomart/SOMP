import { ContactUsResponseModel } from "../../service-layer/models/ContactUsResponseModel";

export interface IContactUsDBManager {
    createContactUs(data: ContactUsResponseModel): Promise<ContactUsResponseModel>;
    getContactUsById(contactUsId: string): Promise<ContactUsResponseModel>;
    getContactUsList(page: number, limit: number): Promise<{ data: ContactUsResponseModel[], total: number }>;
    updateContactUs(contactUsId: string, data: ContactUsResponseModel): Promise<ContactUsResponseModel>;
    deleteContactUsById(contactUsId: string): Promise<ContactUsResponseModel>;
}