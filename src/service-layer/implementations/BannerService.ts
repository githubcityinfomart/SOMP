import { DBManagerFactory } from "../../db-layer/DataAccessLayerFactory";
import { IBannerDBManager } from "../../db-layer/interfaces/IBannerDBManager";
import { IBannerService } from "../../service-layer/interfaces/IBannerService";
import { BannerResponseModel } from "../../service-layer/models/BannerResponseModel";

export class BannerService implements IBannerService {
    private readonly bannerDBManager: IBannerDBManager;

    constructor() {
        this.bannerDBManager = DBManagerFactory.getBannerDBManager();
    }

    public async createBanner(data: BannerResponseModel): Promise<BannerResponseModel> {
        return await this.bannerDBManager.createBanner(data);
    }

    public async getBannerById(bannerId: string): Promise<BannerResponseModel> {
        return await this.bannerDBManager.getBannerById(bannerId);
    }

    public async getBannersList(page: number, limit: number): Promise<{ data: BannerResponseModel[], total: number }> {
        return await this.bannerDBManager.getBannersList(page, limit);
    }

    public async updateBanner(bannerId: string, data: BannerResponseModel): Promise<BannerResponseModel> {
        return await this.bannerDBManager.updateBanner(bannerId, data);
    }

    public async deleteBannerById(bannerId: string): Promise<BannerResponseModel> {
        return await this.bannerDBManager.deleteBannerById(bannerId);
    }
}