import { ServiceObject } from "./ServiceObject";

export class UserSessionResponseModel extends ServiceObject {
    private userId: string;
    private token: string;
    private isExpired: boolean;

    constructor() {
        super();
    }

    /* User Id */
    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    /* Token */
    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    /* Is Expired */
    public getIsExpired(): boolean {
        return this.isExpired;
    }

    public setIsExpired(isExpired: boolean): void {
        this.isExpired = isExpired;
    }

}
