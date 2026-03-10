import { localDevelopment } from "./localDevelopment";
import { production } from "./production";

export class Config {
    private static _instance: Config;
    private env: string;
    private port: number;
    private mongoUrl: string;
    private secretKey: string;
    private awsS3BucketName: string;
    private encryptionKey: string;
    private encryptionIV: string;
    private environment: string;

    private constructor() {
        this.env = process.env.NODE_ENV || 'localdevelopment';
    }

    public static getInstance(): Config {
        return this._instance || (this._instance = new this());
    }

    public async getData(): Promise<any> {
        return this.getDefaultValues();
    }

    private getDefaultValues(): any {
        switch (this.env) {
            case "production":
                return production;
            default:
                return localDevelopment;
        }
    }


    // Setter functions
    public setPort(port: number): void {
        this.port = port;
    }

    public setMongoUrl(mongoUrl: string): void {
        this.mongoUrl = mongoUrl;
    }

    public setSecretKey(secretKey: string): void {
        this.secretKey = secretKey;
    }

  

   
  

    public setAwsS3BucketName(awsS3BucketName: string): void {
        this.awsS3BucketName = awsS3BucketName;
    }

    public setEncryptionKey(encryptionKey: string): void {
        this.encryptionKey = encryptionKey;
    }
    public setEncryptionIV(encryptionIV: string): void {
        this.encryptionIV = encryptionIV;
    }

    public setConfigEnvironment(environment: string): void {
        this.environment = environment;
    }
    // Load the configuration using the setter functions
    private async load(): Promise<void> {
        const data = await this.getData();
        this.setPort(parseInt(process.env.PORT ? process.env.PORT : (data.PORT || 3000)));
        this.setMongoUrl(data.MONGOURL);
        this.setSecretKey(data.AUTHSECRETKEY);

        this.setEncryptionKey(data.ENCRYPTIONKEY);
        this.setEncryptionIV(data.ENCRYPTIONIV);

        this.setConfigEnvironment(data.ENVIRONMENT);

    }

    // Initialize the config asynchronously
    public async init(): Promise<void> {
        await this.load();
    }

    // Getter methods
    public getEnvironment(): string {
        return this.env;
    }
    public getConfigEnvironment(): string {
        return this.environment;
    }

    public isLocalDevelopment(): boolean {
        return this.getEnvironment() == "localdevelopment";
    }


    public isProduction(): boolean {
        return this.getEnvironment() == "production";
    }

    public getPort(): number {
        return this.port;
    }

    public getMongoUrl(): string {
        return this.mongoUrl;
    }

    public getSecretKey(): string {
        return this.secretKey;
    }

   

   
    

    public getAwsS3BucketName(): string {
        return this.awsS3BucketName;
    }

    public getEncryptionKey(): string {
        return this.encryptionKey;
    }
    public getEncryptionIV(): string {
        return this.encryptionIV;
    }

}
