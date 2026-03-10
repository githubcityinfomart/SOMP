import { ServiceObject } from "./ServiceObject";

export class ArticleResponseModel extends ServiceObject {
    private title: string;
    private category_id: string;
    private publish_date: Date;
    private focus_keyword: string;
    private url_slug: string;
    private permalink: string;
    private meta_description: string;
    private short_description: string;
    private image: string;
    private image_local: string;
    private tags: string[];
    private content: string;

    constructor() {
        super();
    }

    public getTitle(): string { return this.title; }
    public setTitle(title: string): void { this.title = title; }

    public getCategoryId(): string { return this.category_id; }
    public setCategoryId(category_id: string): void { this.category_id = category_id; }

    public getPublishDate(): Date { return this.publish_date; }
    public setPublishDate(publish_date: Date): void { this.publish_date = publish_date; }

    public getFocusKeyword(): string { return this.focus_keyword; }
    public setFocusKeyword(focus_keyword: string): void { this.focus_keyword = focus_keyword; }

    public getUrlSlug(): string { return this.url_slug; }
    public setUrlSlug(url_slug: string): void { this.url_slug = url_slug; }

    public getPermalink(): string { return this.permalink; }
    public setPermalink(permalink: string): void { this.permalink = permalink; }

    public getMetaDescription(): string { return this.meta_description; }
    public setMetaDescription(meta_description: string): void { this.meta_description = meta_description; }

    public getShortDescription(): string { return this.short_description; }
    public setShortDescription(short_description: string): void { this.short_description = short_description; }

    public getImage(): string { return this.image; }
    public setImage(image: string): void { this.image = image; }

    public getImageLocal(): string { return this.image_local; }
    public setImageLocal(image_local: string): void { this.image_local = image_local; }

    public getTags(): string[] { return this.tags; }
    public setTags(tags: string[]): void { this.tags = tags; }

    public getContent(): string { return this.content; }
    public setContent(content: string): void { this.content = content; }
}