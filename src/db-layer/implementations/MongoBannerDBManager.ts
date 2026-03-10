import mongoose from "mongoose";
import { IBannerDBManager } from "../../db-layer/interfaces/IBannerDBManager";
import { DBConstants } from "../../db-layer/models/DBConstants";
import { DBBannerSchema } from "../../db-layer/models/DBBanner";
import { BannerResponseModel } from "../../service-layer/models/BannerResponseModel";
import { BannerUtility } from "../../common/utils/BannerUtility";
import { ObjectStatus } from "../../service-layer/models/ServiceObject";
import { Utility } from "../../common/utils/Utility";

export class MongoBannerDBManager implements IBannerDBManager {
    private bannerDB: any;

    constructor() {
        this.bannerDB = mongoose.model(DBConstants.BannersCollection, DBBannerSchema);
    }

    public async createBanner(data: BannerResponseModel): Promise<BannerResponseModel> {
        let db = new this.bannerDB(data);
        let ret = await db.save();
        return BannerUtility.getBannerResponseModel(ret);
    }

    public async getBannerById(bannerId: string): Promise<BannerResponseModel> {
        let ret = await this.bannerDB.findById(bannerId);
        if (!ret) return null;
        return BannerUtility.getBannerResponseModel(ret);
    }

     public async getBannersList(page: number, limit: number): Promise<{ data: BannerResponseModel[], total: number }> {
        const skip = (page - 1) * limit;

        const [banners, total] = await Promise.all([
            this.bannerDB.find({ status: { $ne: ObjectStatus.Deleted } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.bannerDB.countDocuments({ status: { $ne: ObjectStatus.Deleted } })
        ]);

        if (!banners) return { data: [], total: 0 };

        const data = Utility.getListOfItems(banners, BannerUtility.getBannerResponseModel);
        return { data, total };
    }

    public async updateBanner(bannerId: string, data: BannerResponseModel): Promise<BannerResponseModel> {
        const banner = await this.bannerDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(bannerId) },
            {
                $set: {
                    title: data.getTitle(),
                    description: data.getDescription(),
                    ...(data.getBannerImage() && { banner_image: data.getBannerImage() }),
                    ...(data.getBannerImageLocal() && { banner_image_local: data.getBannerImageLocal() }),
                    link: data.getLink(),
                    status: data.getStatus(),
                }
            },
            { new: true }
        );
        if (!banner) return null;
        return BannerUtility.getBannerResponseModel(banner);
    }

    public async deleteBannerById(bannerId: string): Promise<BannerResponseModel> {
        const banner = await this.bannerDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(bannerId) },
            { $set: { status: ObjectStatus.Deleted } },
            { new: true }
        );
        if (!banner) return null;
        return BannerUtility.getBannerResponseModel(banner);
    }
}