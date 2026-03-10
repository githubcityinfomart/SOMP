import { DBManagerFactory } from "../../db-layer/DataAccessLayerFactory";
import { IArticleDBManager } from "../../db-layer/interfaces/IArticleDBManager";
import { IArticleService } from "../../service-layer/interfaces/IArticleService";
import { ArticleResponseModel } from "../../service-layer/models/ArticleResponseModel";

export class ArticleService implements IArticleService {
    private readonly articleDBManager: IArticleDBManager;

    constructor() {
        this.articleDBManager = DBManagerFactory.getArticleDBManager();
    }

    public async createArticle(data: ArticleResponseModel): Promise<ArticleResponseModel> {
        return await this.articleDBManager.createArticle(data);
    }

    public async getArticleById(articleId: string): Promise<ArticleResponseModel> {
        return await this.articleDBManager.getArticleById(articleId);
    }

    public async getArticlesList(page: number, limit: number): Promise<{ data: ArticleResponseModel[], total: number }> {
        return await this.articleDBManager.getArticlesList(page, limit);
    }


    public async updateArticle(articleId: string, data: ArticleResponseModel): Promise<ArticleResponseModel> {
        return await this.articleDBManager.updateArticle(articleId, data);
    }

    public async deleteArticleById(articleId: string): Promise<ArticleResponseModel> {
        return await this.articleDBManager.deleteArticleById(articleId);
    }
}