import { ArticleResponseModel } from "../../service-layer/models/ArticleResponseModel";
import { Utility } from "./Utility";

export class ArticleUtility extends Utility {
    constructor() {
        super();
    }

    public static getArticleResponseModel(data: any): ArticleResponseModel {
        const model: ArticleResponseModel = new ArticleResponseModel();

        model.setId(data?._id ? data._id.toString() : "");
        model.setTitle(data?.title ? data.title.trim() : "");
        model.setCategoryId(data?.category_id ? data.category_id.toString() : "");
        model.setPublishDate(data?.publish_date ? new Date(data.publish_date) : null);
        model.setFocusKeyword(data?.focus_keyword ? data.focus_keyword.trim() : "");
        model.setUrlSlug(data?.url_slug ? data.url_slug.trim() : "");
        model.setPermalink(data?.permalink ? data.permalink.trim() : "");
        model.setMetaDescription(data?.meta_description ? data.meta_description.trim() : "");
        model.setShortDescription(data?.short_description ? data.short_description.trim() : "");
        model.setImage(data?.image ? data.image.trim() : "");
        model.setImageLocal(data?.image_local ? data.image_local.trim() : "");
        model.setTags(data?.tags ? data.tags : []);
        model.setContent(data?.content ? data.content.trim() : "");
        model.setStatus(data?.status ? data.status.trim() : "draft");
        model.setEnable(data?.isPublish ? data.isPublish : false);
        model.setCreatedAt(data?.createdAt ? new Date(data.createdAt) : null);
        model.setUpdatedAt(data?.updatedAt ? new Date(data.updatedAt) : null);

        return model;
    }
}