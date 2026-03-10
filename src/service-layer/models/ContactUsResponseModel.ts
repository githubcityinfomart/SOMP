import { ServiceObject } from "./ServiceObject";

export class ContactUsResponseModel extends ServiceObject {
    private full_name: string;
    private phone_number: string;
    private interested_course: string;
    private message: string;
    private email: string;

    constructor() {
        super();
    }

    public getFullName(): string { return this.full_name; }
    public setFullName(full_name: string): void { this.full_name = full_name; }

    public getPhoneNumber(): string { return this.phone_number; }
    public setPhoneNumber(phone_number: string): void { this.phone_number = phone_number; }

    public getInterestedCourse(): string { return this.interested_course; }
    public setInterestedCourse(interested_course: string): void { this.interested_course = interested_course; }

    public getEmail(): string { return this.email; }
    public setEmail(email: string): void { this.email = email; }

    public getMessage(): string { return this.message; }
    public setMessage(message: string): void { this.message = message; }
}