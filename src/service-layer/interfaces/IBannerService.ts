import { BannerResponseModel } from "../models/BannerResponseModel";

export interface IBannerService {
    createBanner(data: BannerResponseModel): Promise<BannerResponseModel>;
    getBannerById(bannerId: string): Promise<BannerResponseModel>;
    getBannersList(page: number, limit: number): Promise<{ data: BannerResponseModel[], total: number }>;
    updateBanner(bannerId: string, data: BannerResponseModel): Promise<BannerResponseModel>;
    deleteBannerById(bannerId: string): Promise<BannerResponseModel>;
}