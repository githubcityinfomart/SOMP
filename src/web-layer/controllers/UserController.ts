import jwt from "jwt-simple";
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { Config } from "../../config/config";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { JWTTokenClaims } from "../../service-layer/models/JWTTokenClaims";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { AppPermission } from "../../service-layer/implementations/JWTTokenService";
import { Constants } from "../../common/utils/Constants";
import { IUserService } from "../../service-layer/interfaces/IUserService";
import { UserResponseModel } from "../../service-layer/models/UserResponseModel";
import { UserUtility } from "../../common/utils/UserUtility";
import { UserSessionUtility } from "../../common/utils/UserSessionUtility";
import { AccessControl } from "../../common/utils/AccessControlUtils";

@JsonController(Constants.ROUTER_PREFIX + "/user")
export class UserController {
    private readonly userService: IUserService;

    constructor() {
        this.userService = ServiceFactory.getUserService();
    }
    @Post("/login")
    public async loginUser(@Body() req: any): Promise<ResultModel> {
        let reqModel: UserResponseModel = UserUtility.getUserResponseModel(req);
        console.log(reqModel, 'reqModel');

        if (reqModel.getEmail() === undefined && reqModel.getEmail() === "" && reqModel.getEmail().trim() === "") {
            throw new MyError("Please enter email")
        }
        if (reqModel.getPassword() === undefined && reqModel.getPassword() === "" && reqModel.getPassword().trim() === "") {
            throw new MyError("Please enter password")
        }
        reqModel.setEmail(reqModel?.getEmail()?.toLowerCase())
        let data = await this.userService.getUserByEmail(reqModel.getEmail());

        const decryptPassword = await ServiceFactory.getEncryptionService().decrypt(data.getPassword());
        if (reqModel.getPassword() !== decryptPassword) {
            throw new MyError("Incorrect Password.")
        }
        const token = await this.getAccessToken(data);
        const sessionModel = UserSessionUtility.getUserSessionResponseModel({
            userId: data.getId(),
            token,
        });

        await ServiceFactory.getUserSessionService().createSession(sessionModel);
        const resultModel = new ResultModel();
        resultModel.setData({ ...data, token });
        return resultModel;
    }

    private async getAccessToken(user: UserResponseModel): Promise<string> {
        const userId = await ServiceFactory.getEncryptionService().encrypt(user.getId().toString());

        const claims: JWTTokenClaims = new JWTTokenClaims(
            userId,
            8400,
            user.getRole()
        );
        return this.getJWTToken(claims);
    }

    private getJWTToken(claims: JWTTokenClaims): string {
        const jwtToken = jwt.encode(
            this.toJWTPayload(claims),
            Config.getInstance().getSecretKey(),
            this.Algorithm
        );
        return jwtToken;
    }

    private Algorithm: jwt.TAlgorithm = "HS256";

    private toJWTPayload(claims: JWTTokenClaims): any {
        return {
            aud: claims.getUserId(),
            exp: claims.getExpiresAt(),
            role: claims.getRole()
        };
    }

    @Post("/create")
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async register(@Body() req: any): Promise<ResultModel> {
        let reqModel: UserResponseModel = UserUtility.getUserResponseModel(req);
        if (reqModel.getEmail() === undefined && reqModel.getEmail() === "" && reqModel.getEmail().trim() === "") {
            throw new MyError("Please enter email")
        }
        if (reqModel.getPassword() === undefined && reqModel.getPassword() === "" && reqModel.getPassword().trim() === "") {
            throw new MyError("Please enter password")
        }
        if (reqModel.getFirstName() === undefined && reqModel.getFirstName() === "" && reqModel.getFirstName().trim() === "") {
            throw new MyError("Please enter first Name")
        }
        if (reqModel.getLastName() === undefined && reqModel.getLastName() === "" && reqModel.getLastName().trim() === "") {
            throw new MyError("Please enter last name")
        }
        if (reqModel.getRole() === undefined && reqModel.getRole().trim() === "") {
            throw new MyError("Please select user role")
        }
        let encryptPassword = await ServiceFactory.getEncryptionService().encrypt(reqModel.getPassword())
        reqModel.setPassword(encryptPassword)
        reqModel.setEmail(reqModel?.getEmail()?.toLowerCase())
        let dataExists = await this.userService.getUserByEmail(reqModel.getEmail());
        if (dataExists) {
            throw new MyError(`This email is already linked to role ${dataExists?.getRole()}`)
        }
        let roleExists = await this.userService.getUserByRole(reqModel.getRole());
        if (roleExists) {
            throw new MyError(`User already exists for role ${roleExists?.getRole()}`)
        }
        let data = await this.userService.register(reqModel)
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("User Created Successfully")
        return resultModel;
    }


    @Get("/list")
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async getUsersList(): Promise<ResultModel> {
        let data = await this.userService.getUsersList()
        const resultModel = new ResultModel();
        resultModel.setData(data);
        resultModel.setMessage("User fetched Successfully")
        return resultModel;
    }

    @Get("/delete/:id")
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async deleteUser(@Param("id") id: string): Promise<ResultModel> {
        let data = await this.userService.deleteUserById(id)
        const resultModel = new ResultModel();
        resultModel.setMessage("User deleted Successfully")
        return resultModel;
    }
}