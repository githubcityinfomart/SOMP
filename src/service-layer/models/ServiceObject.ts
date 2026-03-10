export enum ObjectStatus {
    Unknown = "unknown",
    Active = "active",
    Deleted = "deleted",
    Deactivated = 'deactivated',
    Pending = 'pending ',
    Blocked = "blocked",
    Inactive = "inactive",
    Draft = "draft",
    Expired = "expired"
}
export class ServiceObject {
    private id: string;
    private createdAt: Date;
    private updatedAt: Date;
    private lastModifiedAt: Date;
    private enable: boolean;
    private status: ObjectStatus;

    public getStatus(): ObjectStatus {
        return this.status;
    }

    public setStatus(status: ObjectStatus): void {
        this.status = status;
    }

    public isEnable(): boolean {
        return this.enable;
    }

    public setEnable(enable: boolean): void {
        this.enable = enable;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    public getLastModifiedAt(): Date {
        return this.lastModifiedAt;
    }

    public setLastModifiedAt(lastModifiedAt: Date): void {
        this.lastModifiedAt = lastModifiedAt;
    }
}