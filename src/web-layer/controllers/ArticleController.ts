import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, UploadedFile } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { AppPermission } from "../../service-layer/implementations/JWTTokenService";
import { Constants } from "../../common/utils/Constants";
import { IArticleService } from "../../service-layer/interfaces/IArticleService";
import { ArticleResponseModel } from "../../service-layer/models/ArticleResponseModel";
import { ArticleUtility } from "../../common/utils/ArticleUtility";
import { AccessControl } from "../../common/utils/AccessControlUtils";
import { FileUploadService } from "../../common/utils/FileUploadUtility";

@JsonController(Constants.ROUTER_PREFIX + "/article")
export class ArticleController {
    private readonly articleService: IArticleService;

    constructor() {
        this.articleService = ServiceFactory.getArticleService();
    }

    
   @Get("/list")
public async getArticlesList(
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
): Promise<ResultModel> {
    const { data, total } = await this.articleService.getArticlesList(page, limit);
    const resultModel = new ResultModel();
    resultModel.setData(data);
    resultModel.setTotal(total);
    resultModel.setLimit(limit);
    resultModel.setOffset((page - 1) * limit);
    resultModel.setMessage("Articles Fetched Successfully");
    return resultModel;
}

    @Get("/:id")
    public async getArticleById(@Param("id") id: string): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide article id");
        }
        let data = await this.articleService.getArticleById(id);
        if (!data) {
            throw new MyError("Article not found");
        }
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Article Fetched Successfully");
        return resultModel;
    }

    @Post("/create")
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async createArticle(
        @Body() req: any,
        @UploadedFile("image", { required: false }) image?: Express.Multer.File
    ): Promise<ResultModel> {
        let reqModel: ArticleResponseModel = ArticleUtility.getArticleResponseModel(req);

        if (!reqModel.getTitle() || reqModel.getTitle().trim() === "") {
            throw new MyError("Please enter title");
        }
        if (!reqModel.getCategoryId() || reqModel.getCategoryId().trim() === "") {
            throw new MyError("Please enter category");
        }
        if (!reqModel.getShortDescription() || reqModel.getShortDescription().trim() === "") {
            throw new MyError("Please enter short description");
        }
        if (!reqModel.getContent() || reqModel.getContent().trim() === "") {
            throw new MyError("Please enter article content");
        }

        // Handle image upload via FileUploadService
        if (image) {
            const imageUrl = await FileUploadService.handleFileUpload(
                image,
                image.originalname,
                process.env.GOOGLE_DRIVE_FOLDER_ID
            );
            reqModel.setImage(imageUrl);
        }

        let data = await this.articleService.createArticle(reqModel);
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Article Created Successfully");
        return resultModel;
    }

    @Put("/update/:id")
     @AccessControl({ permissions: [AppPermission.Admin] })
    public async updateArticle(
        @Param("id") id: string,
        @Body() req: any,
        @UploadedFile("image", { required: false }) image?: Express.Multer.File
    ): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide article id");
        }

        let reqModel: ArticleResponseModel = ArticleUtility.getArticleResponseModel(req);

        // Handle image upload via FileUploadService
        if (image) {
            const imageUrl = await FileUploadService.handleFileUpload(
                image,
                image.originalname,
                process.env.GOOGLE_DRIVE_FOLDER_ID
            );
            reqModel.setImage(imageUrl);
        }

        let data = await this.articleService.updateArticle(id, reqModel);
        if (!data) {
            throw new MyError("Article not found");
        }
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Article Updated Successfully");
        return resultModel;
    }

    @Delete("/delete/:id")
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async deleteArticle(@Param("id") id: string): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide article id");
        }

        let data = await this.articleService.deleteArticleById(id);
        if (!data) {
            throw new MyError("Article not found");
        }
        const resultModel = new ResultModel();
        resultModel.setMessage("Article Deleted Successfully");
        return resultModel;
    }
}