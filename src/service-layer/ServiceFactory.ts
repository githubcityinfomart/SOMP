
import { IAuthService } from "./interfaces/IAuthService";
import { IAWSEmailProvider } from "./interfaces/IAWSEmailProvider";
import { IAWSS3Service } from "./interfaces/IAWSS3Service";
import { IEncryptionService } from "./interfaces/IEncryptionService";
import { IUserService } from "./interfaces/IUserService";
import { IUserSessionService } from "./interfaces/IUserSessionService";
import { ITestimonialService } from "./interfaces/ITestimonialService";
import { ICourseService } from "./interfaces/ICourseService";
import { IArticleService } from "./interfaces/IArticleService";
import { IBannerService } from "./interfaces/IBannerService";
import { IContactUsService } from "./interfaces/IContactUsService";

export class ServiceFactory {

    private static userService: IUserService;
    private static AWSEmailProvider: IAWSEmailProvider;
    private static awsS3Service: IAWSS3Service;
    private static authservice: IAuthService;
    private static userSessionService: IUserSessionService;
    private static encryptionService: IEncryptionService;
    private static testimonialService: ITestimonialService;
    public static courseService: ICourseService;
    private static articleService: IArticleService;
    private static contactUsService: IContactUsService;
    private static bannerService: IBannerService;

    public static getArticleService(): IArticleService {
        return this.articleService;
    }

    public static setArticleService(articleService: IArticleService): void {
        this.articleService = articleService;
    }

    public static getContactUsService(): IContactUsService {
        return this.contactUsService;
    }

    public static setContactUsService(contactUsService: IContactUsService): void {
        this.contactUsService = contactUsService;
    }
    public static getBannerService(): IBannerService {
        return this.bannerService;
    }
    public static setBannerService(bannerService: IBannerService): void {
        this.bannerService = bannerService;
    }

    public static getUserService(): IUserService {
        return this.userService;
    }

    public static setUserService(userService: IUserService): void {
        this.userService = userService;
    }

    public static getAWSEmailProvider(): IAWSEmailProvider {
        return this.AWSEmailProvider;
    }

    public static setAWSEmailProvider(AWSEmailProvider: IAWSEmailProvider): void {
        this.AWSEmailProvider = AWSEmailProvider;
    }
    public static getAwsS3Service(): IAWSS3Service {
        return this.awsS3Service;
    }

    public static setAwsS3Service(awsS3Service: IAWSS3Service): void {
        this.awsS3Service = awsS3Service;
    }



    public static getAuthService(): IAuthService {
        return this.authservice;
    }

    public static setAuthService(authservice: IAuthService): void {
        this.authservice = authservice;
    }

    public static getUserSessionService(): IUserSessionService {
        return this.userSessionService;
    }

    public static setUserSessionService(userSessionService: IUserSessionService): void {
        this.userSessionService = userSessionService;
    }
    public static getEncryptionService(): IEncryptionService {
        return this.encryptionService;
    }

    public static setEncryptionService(encryptionService: IEncryptionService): void {
        this.encryptionService = encryptionService;
    }
    public static getTestimonialService(): ITestimonialService {
        return this.testimonialService;
    }
    public static setTestimonialService(testimonialService: ITestimonialService): void {
        this.testimonialService = testimonialService;
    }
    public static getCourseService(): ICourseService {
        return this.courseService;
    }
    public static setCourseService(courseService: ICourseService): void {
        this.courseService = courseService;
    }
}
