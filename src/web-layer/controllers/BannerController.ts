import { Body, Delete, Get, JsonController, Param,QueryParam, Post, Put, UploadedFile } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { Constants } from "../../common/utils/Constants";
import { IBannerService } from "../../service-layer/interfaces/IBannerService";
import { BannerResponseModel } from "../../service-layer/models/BannerResponseModel";
import { BannerUtility } from "../../common/utils/BannerUtility";
import { FileUploadService } from "../../common/utils/FileUploadUtility";
import { AppPermission } from "service-layer/implementations/JWTTokenService";
import { AccessControl } from "common/utils/AccessControlUtils";

@JsonController(Constants.ROUTER_PREFIX + "/banner")
export class BannerController {
    private readonly bannerService: IBannerService;

    constructor() {
        this.bannerService = ServiceFactory.getBannerService();
    }

    @Get("/list")
    public async getBannersList(
        @QueryParam("page") page: number = 1,
        @QueryParam("limit") limit: number = 10
    ): Promise<ResultModel> {
        let data = await this.bannerService.getBannersList(page, limit);
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Banners Fetched Successfully");
        return resultModel;
    }

    @Get("/:id")
    public async getBannerById(@Param("id") id: string): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide banner id");
        }
        let data = await this.bannerService.getBannerById(id);
        if (!data) {
            throw new MyError("Banner not found");
        }
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Banner Fetched Successfully");
        return resultModel;
    }

    @Post("/create")
     @AccessControl({ permissions: [AppPermission.Admin] })
    public async createBanner(
        @Body() req: any,
        @UploadedFile("banner_image", { required: false }) banner_image?: Express.Multer.File
    ): Promise<ResultModel> {
        let reqModel: BannerResponseModel = BannerUtility.getBannerResponseModel(req);

        if (!reqModel.getTitle() || reqModel.getTitle().trim() === "") {
            throw new MyError("Please enter title");
        }

        if (banner_image) {
            const imageUrl = await FileUploadService.handleFileUpload(
                banner_image,
                banner_image.originalname,
                process.env.GOOGLE_DRIVE_FOLDER_ID
            );
            reqModel.setBannerImage(imageUrl);
            reqModel.setBannerImageLocal(banner_image.originalname);
        }

        let data = await this.bannerService.createBanner(reqModel);
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Banner Created Successfully");
        return resultModel;
    }

    @Put("/update/:id")
     @AccessControl({ permissions: [AppPermission.Admin] })
    public async updateBanner(
        @Param("id") id: string,
        @Body() req: any,
        @UploadedFile("banner_image", { required: false }) banner_image?: Express.Multer.File
    ): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide banner id");
        }

        let reqModel: BannerResponseModel = BannerUtility.getBannerResponseModel(req);

        if (banner_image) {
            const imageUrl = await FileUploadService.handleFileUpload(
                banner_image,
                banner_image.originalname,
                process.env.GOOGLE_DRIVE_FOLDER_ID
            );
            reqModel.setBannerImage(imageUrl);
            reqModel.setBannerImageLocal(banner_image.originalname);
        }

        let data = await this.bannerService.updateBanner(id, reqModel);
        if (!data) {
            throw new MyError("Banner not found");
        }
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Banner Updated Successfully");
        return resultModel;
    }

    @Delete("/delete/:id")
     @AccessControl({ permissions: [AppPermission.Admin] })
    public async deleteBanner(@Param("id") id: string): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide banner id");
        }
        let data = await this.bannerService.deleteBannerById(id);
        if (!data) {
            throw new MyError("Banner not found");
        }
        const resultModel = new ResultModel();
        resultModel.setMessage("Banner Deleted Successfully");
        return resultModel;
    }
}