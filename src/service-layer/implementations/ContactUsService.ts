import { DBManagerFactory } from "../../db-layer/DataAccessLayerFactory";
import { IContactUsDBManager } from "../../db-layer/interfaces/IContactUsDBManager";
import { IContactUsService } from "../../service-layer/interfaces/IContactUsService";
import { ContactUsResponseModel } from "../../service-layer/models/ContactUsResponseModel";

export class ContactUsService implements IContactUsService {
    private readonly contactUsDBManager: IContactUsDBManager;

    constructor() {
        this.contactUsDBManager = DBManagerFactory.getContactUsDBManager();
    }

    public async createContactUs(data: ContactUsResponseModel): Promise<ContactUsResponseModel> {
        return await this.contactUsDBManager.createContactUs(data);
    }

    public async getContactUsById(contactUsId: string): Promise<ContactUsResponseModel> {
        return await this.contactUsDBManager.getContactUsById(contactUsId);
    }

    public async getContactUsList(page: number, limit: number): Promise<{ data: ContactUsResponseModel[], total: number }> {
        return await this.contactUsDBManager.getContactUsList(page, limit);
    }

    public async updateContactUs(contactUsId: string, data: ContactUsResponseModel): Promise<ContactUsResponseModel> {
        return await this.contactUsDBManager.updateContactUs(contactUsId, data);
    }

    public async deleteContactUsById(contactUsId: string): Promise<ContactUsResponseModel> {
        return await this.contactUsDBManager.deleteContactUsById(contactUsId);
    }
}