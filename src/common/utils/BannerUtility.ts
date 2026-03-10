import { BannerResponseModel } from "../../service-layer/models/BannerResponseModel";

export class BannerUtility {
    public static getBannerResponseModel(data: any): BannerResponseModel {
        let model = new BannerResponseModel();
        model.setId(data._id?.toString());
        model.setTitle(data.title);
        model.setDescription(data.description);
        model.setBannerImage(data.banner_image);
        model.setBannerImageLocal(data.banner_image_local);
        model.setLink(data.link);
        model.setStatus(data.status);
        model.setCreatedAt(data.createdAt);
        model.setUpdatedAt(data.updatedAt);
        return model;
    }
}