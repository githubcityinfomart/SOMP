import { Body, Delete, Get, JsonController, Param,QueryParam, Post, Put } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { Constants } from "../../common/utils/Constants";
import { IContactUsService } from "../../service-layer/interfaces/IContactUsService";
import { ContactUsResponseModel } from "../../service-layer/models/ContactUsResponseModel";
import { ContactUsUtility } from "../../common/utils/ContactUsUtility";
import { AppPermission } from "service-layer/implementations/JWTTokenService";
import { AccessControl } from "common/utils/AccessControlUtils";

@JsonController(Constants.ROUTER_PREFIX + "/contact-us")
export class ContactUsController {
    private readonly contactUsService: IContactUsService;

    constructor() {
        this.contactUsService = ServiceFactory.getContactUsService();
    }

    @Get("/list")
  
public async getContactUsList(
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
): Promise<ResultModel> {
    let data = await this.contactUsService.getContactUsList(page, limit);
    const resultModel = new ResultModel();
    resultModel.setData(data);
    resultModel.setMessage("Contact Us List Fetched Successfully");
    return resultModel;
}

    @Get("/:id")
    public async getContactUsById(@Param("id") id: string): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide contact us id");
        }
        let data = await this.contactUsService.getContactUsById(id);
        if (!data) {
            throw new MyError("Contact Us entry not found");
        }
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Contact Us Fetched Successfully");
        return resultModel;
    }

    @Post("/create")
    public async createContactUs(@Body() req: any): Promise<ResultModel> {
        let reqModel: ContactUsResponseModel = ContactUsUtility.getContactUsResponseModel(req);

        if (!reqModel.getFullName() || reqModel.getFullName().trim() === "") {
            throw new MyError("Please enter full name");
        }
        if (!reqModel.getPhoneNumber() || reqModel.getPhoneNumber().trim() === "") {
            throw new MyError("Please enter phone number");
        }
        if (!reqModel.getInterestedCourse() || reqModel.getInterestedCourse().trim() === "") {
            throw new MyError("Please enter interested course");
        }

        let data = await this.contactUsService.createContactUs(reqModel);
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Contact Us Submitted Successfully");
        return resultModel;
    }

    @Put("/update/:id")
     @AccessControl({ permissions: [AppPermission.Admin] })
    public async updateContactUs(
        @Param("id") id: string,
        @Body() req: any
    ): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide contact us id");
        }

        let reqModel: ContactUsResponseModel = ContactUsUtility.getContactUsResponseModel(req);

        let data = await this.contactUsService.updateContactUs(id, reqModel);
        if (!data) {
            throw new MyError("Contact Us entry not found");
        }
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("Contact Us Updated Successfully");
        return resultModel;
    }

    @Delete("/delete/:id")
     @AccessControl({ permissions: [AppPermission.Admin] })
    public async deleteContactUs(@Param("id") id: string): Promise<ResultModel> {
        if (!id || id.trim() === "") {
            throw new MyError("Please provide contact us id");
        }

        let data = await this.contactUsService.deleteContactUsById(id);
        if (!data) {
            throw new MyError("Contact Us entry not found");
        }
        const resultModel = new ResultModel();
        resultModel.setMessage("Contact Us Deleted Successfully");
        return resultModel;
    }
}