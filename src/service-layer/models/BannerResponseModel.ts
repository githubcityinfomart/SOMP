import { ServiceObject } from "./ServiceObject";

export class BannerResponseModel extends ServiceObject {
    private title: string;
    private description: string;
    private banner_image: string;
    private banner_image_local: string;
    private link: string;

    constructor() {
        super();
    }

    public getTitle(): string { return this.title; }
    public setTitle(title: string): void { this.title = title; }

    public getDescription(): string { return this.description; }
    public setDescription(description: string): void { this.description = description; }

    public getBannerImage(): string { return this.banner_image; }
    public setBannerImage(banner_image: string): void { this.banner_image = banner_image; }

    public getBannerImageLocal(): string { return this.banner_image_local; }
    public setBannerImageLocal(banner_image_local: string): void { this.banner_image_local = banner_image_local; }

    public getLink(): string { return this.link; }
    public setLink(link: string): void { this.link = link; }
}