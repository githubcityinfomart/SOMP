import { ArticleResponseModel } from "../../service-layer/models/ArticleResponseModel";

export interface IArticleDBManager {
    createArticle(data: ArticleResponseModel): Promise<ArticleResponseModel>;
    getArticleById(articleId: string): Promise<ArticleResponseModel>;
    getArticlesList(page: number, limit: number): Promise<{ data: ArticleResponseModel[], total: number }>;
    updateArticle(articleId: string, data: ArticleResponseModel): Promise<ArticleResponseModel>;
    deleteArticleById(articleId: string): Promise<ArticleResponseModel>;
}