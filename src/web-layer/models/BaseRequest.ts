export class BaseRequest {
    sortBy: string;
    sortingOrder: number;
    sortingField: string;
    searchText: string;
    offset: number;
    limit: number;
    sortingObject = {};
    lowStockOnly: boolean;
    adminId: string;
    privacy: string;
    status: string;
}