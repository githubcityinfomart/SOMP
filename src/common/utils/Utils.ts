export class Utils {

    public static roundedOff(value: number) {
        return parseFloat(value.toFixed(2));
    }

    public static roundedOffWithDecimal(value: number) {
        return parseFloat(value.toFixed());
    }

    public static generateUniqueAWSKey(): string {

        return `${this.getAlphaNumericCAPSString(8)}-${(new Date().getTime() / 1000)}`
    }
    public static getAlphaNumericString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public static getAlphabaticString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public static getAlphaNumericCAPSString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public static getNumericString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public static generateRandomPrefix(): string {
        return Math.random().toString(36).substring(2, 4).toUpperCase();  // Generates a 2-character random prefix
    }

    public static generateUniqueTxnId(): string {
        const prefix = this.getAlphabaticString(2);
        const timestamp = Math.floor(Date.now() / 1000);
        const randomChars = this.getAlphaNumericCAPSString(2);
        const uniqueId = `${prefix}${timestamp}${randomChars}`;

        return uniqueId;
    }
    public static generateOTP(): string {
        var result = '';

        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
        // return "5691";
    }

    public static toBase64(stringToEncode: string): string {
        return Buffer.from(stringToEncode).toString('base64');
    }

    /**
     * Parse string enum with default value
     * @param value 
     * @param enumType 
     * @param defaultEnumValue 
     */
    public static parseDefaultEnum<T>(value: string, enumType: T, defaultEnumValue: T[keyof T]): T[keyof T] {
        const found: T[keyof T] = Utils.parseEnum(value, enumType);
        if (found == undefined) {
            return defaultEnumValue;
        }
        return found;
    }

    /**
     * Not found enum will return undefined
     * @param value 
     * @param enumType 
     */
    public static parseEnum<T>(value: string, enumType: T): T[keyof T] | undefined {
        if (!value) {
            return undefined;
        }

        for (const property in enumType) {
            const enumMember = enumType[property];
            if (typeof enumMember === 'string') {
                if (enumMember.toLowerCase().trim() === value.toLowerCase().trim()) {
                    const key = property as string as keyof typeof enumType;
                    return enumType[key];
                }
            }
        }
        return undefined;
    }

    public static validateOTPExpiration(otpcreatedTimeInMIlliSecs: number, durationInMilliSecs: number) {
        let expiration = durationInMilliSecs ? durationInMilliSecs : 300000;
        let currentTime = new Date().getTime();
        let expiryTime = (otpcreatedTimeInMIlliSecs ? otpcreatedTimeInMIlliSecs : 0) + (expiration ? expiration : 0);
        if (new Date(currentTime) < new Date(expiryTime)) {
            return true;
        } else {
            return false;
        }
    }
    public static parseFormData(text: string | object) {
        try {
            return typeof text === "string" ? JSON.parse(text) : text || {}
        } catch (err) {
            return undefined
        }
    }
    public static formatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const converted = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
        return `${converted} ${sizes[i]}`;
    }
    public static createDateAtMidnight(dateInput: string | Date): Date {
        if (dateInput instanceof Date) {
            return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate(), 0, 0, 0);
        }
        const [day, month, year] = dateInput.split('-').map(Number);
        return new Date(year, month - 1, day, 0, 0, 0);
    }

    public static createDateAtEndOfDay(dateInput: string | Date): Date {
        if (dateInput instanceof Date) {
            return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate(), 23, 59, 0);
        }
        const [day, month, year] = dateInput.split('-').map(Number);
        return new Date(year, month - 1, day, 23, 59, 0);
    }
    public static getTimeUnit(freq: string): 'hours' | 'days' | 'months' | 'years' | undefined {
        const unitMap: Record<string, 'hours' | 'days' | 'months' | 'years'> = {
            hour: 'hours',
            hours: 'hours',
            day: 'days',
            days: 'days',
            week: 'days',
            month: 'months',
            months: 'months',
            year: 'years',
            years: 'years',
        };
        return unitMap[freq];
    }



}