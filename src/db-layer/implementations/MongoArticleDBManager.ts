import mongoose from "mongoose";
import { IArticleDBManager } from "../../db-layer/interfaces/IArticleDBManager";
import { DBConstants } from "../../db-layer/models/DBConstants";
import { DBArticleSchema } from "../../db-layer/models/DBArticle";
import { ArticleResponseModel } from "../../service-layer/models/ArticleResponseModel";
import { ArticleUtility } from "../../common/utils/ArticleUtility";
import { ObjectStatus } from "../../service-layer/models/ServiceObject";
import { Utility } from "../../common/utils/Utility";

export class MongoArticleDBManager implements IArticleDBManager {
    private articleDB: any;

    constructor() {
        this.articleDB = mongoose.model(DBConstants.ArticlesCollection, DBArticleSchema);
    }

    public async createArticle(data: ArticleResponseModel): Promise<ArticleResponseModel> {
        let db = new this.articleDB(data);
        let ret = await db.save();
        return ArticleUtility.getArticleResponseModel(ret);
    }

    public async getArticleById(articleId: string): Promise<ArticleResponseModel> {
        let ret = await this.articleDB.findById(articleId);
        if (!ret) {
            return null;
        }
        return ArticleUtility.getArticleResponseModel(ret);
    }

    public async getArticlesList(page: number, limit: number): Promise<{ data: ArticleResponseModel[], total: number }> {
        const skip = (page - 1) * limit;

        const [articles, total] = await Promise.all([
            this.articleDB.find({ status: { $ne: ObjectStatus.Deleted } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.articleDB.countDocuments({ status: { $ne: ObjectStatus.Deleted } })
        ]);

        if (!articles) return { data: [], total: 0 };

        const data = Utility.getListOfItems(articles, ArticleUtility.getArticleResponseModel);
        return { data, total };
    }

    public async updateArticle(articleId: string, data: ArticleResponseModel): Promise<ArticleResponseModel> {
        const article = await this.articleDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(articleId) },
            {
                $set: {
                    title: data.getTitle(),
                    category_id: data.getCategoryId(),
                    publish_date: data.getPublishDate(),
                    focus_keyword: data.getFocusKeyword(),
                    url_slug: data.getUrlSlug(),
                    permalink: data.getPermalink(),
                    meta_description: data.getMetaDescription(),
                    short_description: data.getShortDescription(),
                    ...(data.getImage() && { image: data.getImage() }),
                    ...(data.getImageLocal() && { image_local: data.getImageLocal() }),
                    tags: data.getTags(),
                    content: data.getContent(),
                    status: data.getStatus(),
                    isPublish: data.isEnable(),
                }
            },
            { new: true }
        );
        if (!article) {
            return null;
        }
        return ArticleUtility.getArticleResponseModel(article);
    }

    public async deleteArticleById(articleId: string): Promise<ArticleResponseModel> {
        const article = await this.articleDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(articleId) },
            { $set: { status: ObjectStatus.Deleted } },
            { new: true }
        );
        if (!article) {
            return null;
        }
        return ArticleUtility.getArticleResponseModel(article);
    }
}