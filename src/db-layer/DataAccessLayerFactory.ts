
import { IUserDBManager } from "./interfaces/IUserDBManager";
import { IUserSessionDBManager } from "./interfaces/IUserSessionDBManager";
import { ITestimonialDBManager } from "./interfaces/ITestimonialDBManager";
import { ICourseDBManager } from "./interfaces/ICourseDBManager";
import { IArticleDBManager } from "./interfaces/IArticleDBManager";
import { IBannerDBManager } from "./interfaces/IBannerDBManager";
import { IContactUsDBManager } from "./interfaces/IContactUsDBManager";

export class DBManagerFactory {

    private static userDBManager: IUserDBManager
    private static userSessionDBManager: IUserSessionDBManager
    private static testimonialDBManager: ITestimonialDBManager
    private static courseDBManager: ICourseDBManager
    private static articleDBManager: IArticleDBManager
    private static contactUsDBManager: IContactUsDBManager
    private static bannerDBManager: IBannerDBManager

    public static getArticleDBManager(): IArticleDBManager {
        return this.articleDBManager;
    }

    public static setArticleDBManager(articleDBManager: IArticleDBManager): void {
        this.articleDBManager = articleDBManager;
    }

    public static getContactUsDBManager(): IContactUsDBManager {
        return this.contactUsDBManager;

    }
    public static setContactUsDBManager(contactUsDBManager: IContactUsDBManager): void {
        this.contactUsDBManager = contactUsDBManager;
    }
    public static getBannerDBManager(): IBannerDBManager {
        return this.bannerDBManager;
    }
    public static setBannerDBManager(bannerDBManager: IBannerDBManager): void {
        this.bannerDBManager = bannerDBManager;
    }

    public static getUserDBManager(): IUserDBManager {
        return this.userDBManager;
    }

    public static setUserDBManager(userDBManager: IUserDBManager): void {
        this.userDBManager = userDBManager;
    }


    public static getUserSessionDBManager(): IUserSessionDBManager {
        return this.userSessionDBManager;
    }

    public static setUserSessionDBManager(userSessionDBManager: IUserSessionDBManager): void {
        this.userSessionDBManager = userSessionDBManager;
    }

    public static getTestimonialDBManager(): ITestimonialDBManager {
        return this.testimonialDBManager;
    }

    public static setTestimonialDBManager(testimonialDBManager: ITestimonialDBManager): void {
        this.testimonialDBManager = testimonialDBManager;
    }

    public static getCourseDBManager(): ICourseDBManager {
        return this.courseDBManager;
    }

    public static setCourseDBManager(courseDBManager: ICourseDBManager): void {
        this.courseDBManager = courseDBManager;
    }



}
