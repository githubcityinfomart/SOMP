import { AppPermission } from "../../service-layer/implementations/JWTTokenService";
import { ServiceObject } from "./ServiceObject";

export class UserResponseModel extends ServiceObject {
    private firstName: string;
    private lastName: string;
    private email: string;
    private role: AppPermission;
    private password: string;

    constructor() {
        super();
    }

    /* First Name */
    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    /* Last Name */
    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    /* Email */
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    /* Role */
    public getRole(): AppPermission {
        return this.role;
    }

    public setRole(role: AppPermission): void {
        this.role = role;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }


}
