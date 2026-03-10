// import { ProductsResponseModel } from "../../service-layer/models/ProductsResponseModel";
// import { Utility } from "./Utility";

// export class ProductUtility extends Utility {
//     constructor() {
//         super();
//     }

//     public static getProductsResponseModel(data: any): ProductsResponseModel {
//         const model: ProductsResponseModel = new ProductsResponseModel();
//         model.setId(data?._id ? data._id.toString() : "");
//         model.setName(data?.name ? data.name.trim() : "");
//         model.setCategoryId(data?.categoryId ? data.categoryId : null)
//         model.setSubCategoryId(data?.subCategoryId ? data?.subCategoryId : null)
//         model.setCreatedAt(
//             data?.createdAt ? new Date(data.createdAt) : null
//         );

//         model.setUpdatedAt(
//             data?.updatedAt ? new Date(data.updatedAt) : null
//         );

//         return model;
//     }
// }