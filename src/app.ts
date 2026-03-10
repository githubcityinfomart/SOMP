import bodyParser from "body-parser";
import "class-transformer";
import cors from "cors";
import express from "express";
import "reflect-metadata"; // this is required
import { RoutingControllersOptions, useExpressServer } from "routing-controllers";
import { Config } from "./config/config";
import { DBManagerFactory } from "./db-layer/DataAccessLayerFactory";
import { MongoUserSessionDBManager } from "./db-layer/implementations/MongoUserSessionDBManager";
import { ServiceFactory } from "./service-layer/ServiceFactory";
import { AuthService } from "./service-layer/implementations/AuthService";
import { EncryptionService } from "./service-layer/implementations/EncryptionService";
import { UserService } from "./service-layer/implementations/UserService";
import { UserSessionService } from "./service-layer/implementations/UserSessionService";
import { AuthorizationChecker } from "./web-layer/middlewares/AuthorizationChecker";
import { MongoUserDBManager } from "./db-layer/implementations/MongoUserDBManager";
import { MongoDBManager } from "./db-layer/implementations/MongoDBManager";
import { MongoTestimonialDBManager } from "./db-layer/implementations/MongoTestimonialDBManager";
import { TestimonialService } from "./service-layer/implementations/TestimonialService";
import { MongoCourseDBManager } from "./db-layer/implementations/MongoCourseDBManager";
import { CourseService } from "./service-layer/implementations/CourseService";
import { MongoArticleDBManager } from "./db-layer/implementations/MongoArticleDBManager";
import { MongoBannerDBManager } from "./db-layer/implementations/MongoBannerDBManager";
import { MongoContactUsDBManager } from "./db-layer/implementations/MongoContactUsDBManager";
import { ContactUsService } from "service-layer/implementations/ContactUsService";
import { BannerService } from "service-layer/implementations/BannerService";
import { ArticleService } from "service-layer/implementations/ArticleService";

var compression = require('compression')

export class App {
  public app: express.Application;
  public mongoUrl: string;
  private routingControllersOptions: RoutingControllersOptions = {};
  public jsOrTs;

  constructor() {
    this.app = express();
  }

  public async init(): Promise<void> {
    try {
      await Config.getInstance().init();
      this.mongoUrl = Config.getInstance().getMongoUrl();
      this.setup();
      this.config();
    } catch (error) {
      console.error("Error during application initialization:", error);
      throw error;
    }
  }

  private config(): void {
    this.app.use(compression());
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(bodyParser.json({ limit: '1024kb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.jsOrTs = Config.getInstance().isLocalDevelopment() ? 'ts' : 'js';

    this.routingControllersOptions = {
      development: false,
      classTransformer: false,
      validation: {
        skipMissingProperties: false,
        whitelist: true,
      },
      cors: true,
      routePrefix: "/",
      authorizationChecker: new AuthorizationChecker().check,
      defaultErrorHandler: true,
      defaults: {
        nullResultCode: 404,
        undefinedResultCode: 204,
        paramOptions: { required: true },
      },
      controllers: [__dirname + `/web-layer/controllers/*.${this.jsOrTs}`, __dirname + `/web-layer/socialScore/controllers/*.${this.jsOrTs}`, __dirname + `/web-layer/public-controller/PublicController.${this.jsOrTs}`],
      middlewares: [__dirname + `/web-layer/middlewares/*.${this.jsOrTs}`],
    };

    useExpressServer(this.app, this.routingControllersOptions);
  }

  private setup(): void {
    const dbManager: MongoDBManager = new MongoDBManager(this.mongoUrl);
    dbManager.connect();
    DBManagerFactory.setUserDBManager(new MongoUserDBManager());
    DBManagerFactory.setUserSessionDBManager(new MongoUserSessionDBManager());
    DBManagerFactory.setTestimonialDBManager(new MongoTestimonialDBManager());
    DBManagerFactory.setCourseDBManager(new MongoCourseDBManager());
    ServiceFactory.setUserService(new UserService());
    ServiceFactory.setAuthService(new AuthService());
    ServiceFactory.setUserSessionService(new UserSessionService());
    ServiceFactory.setEncryptionService(new EncryptionService());
    ServiceFactory.setTestimonialService(new TestimonialService());
    ServiceFactory.setCourseService(new CourseService());
    DBManagerFactory.setArticleDBManager(new MongoArticleDBManager());
    ServiceFactory.setArticleService(new ArticleService());
    DBManagerFactory.setContactUsDBManager(new MongoContactUsDBManager());
    ServiceFactory.setContactUsService(new ContactUsService());
    DBManagerFactory.setBannerDBManager(new MongoBannerDBManager());
    ServiceFactory.setBannerService(new BannerService());
  }
}
