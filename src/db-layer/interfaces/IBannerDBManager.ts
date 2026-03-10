import { BannerResponseModel } from "../../service-layer/models/BannerResponseModel";

export interface IBannerDBManager {
    createBanner(data: BannerResponseModel): Promise<BannerResponseModel>;
    getBannerById(bannerId: string): Promise<BannerResponseModel>;
    getBannersList(page: number, limit: number): Promise<{ data: BannerResponseModel[], total: number }>;
    updateBanner(bannerId: string, data: BannerResponseModel): Promise<BannerResponseModel>;
    deleteBannerById(bannerId: string): Promise<BannerResponseModel>;
}