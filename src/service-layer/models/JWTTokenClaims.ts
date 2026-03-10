import { IsMongoId, IsPositive, IsString } from "class-validator";
import { Config } from "../../config/config";

export class JWTTokenClaims {
    @IsMongoId()
    private userId: string;

    @IsPositive()
    private expiresAt: number;

    @IsString()
    private role?: string;



    public constructor(
        userId: string,
        expiryTimeInSecs: number,
        role?: string
    ) {
        if (Config.getInstance().isProduction()) {
            expiryTimeInSecs = 86400; // 1 days
        } else {
            expiryTimeInSecs = 86400;  // 1 day
        }

        this.userId = userId;
        this.expiresAt = Math.floor(Date.now() / 1000) + expiryTimeInSecs;
        this.role = role;
    }

    public getUserId(): string {
        return this.userId;
    }
    public setUserId(userId: string): void {
        this.userId = userId;
    }


    public getExpiresAt(): number {
        return this.expiresAt;
    }
    public setExpiresAt(expiresAt: number): void {
        this.expiresAt = expiresAt;
    }

    public getRole(): string | undefined {
        return this.role;
    }
    public setRole(role: string): void {
        this.role = role;
    }

}