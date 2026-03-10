import { Constants } from "../../common/utils/Constants";
import { Config } from "../../config/config";
import { ServiceFactory } from "../ServiceFactory";

export class ResultModel {
    private result_code: string;
    private message: string;
    private limit: number;
    private offset: number;
    private data: any;
    private total: number;
    private error: any;
    private errorCode: string;
    private errorConstant: string;
    private arrIds: Array<string>;

    constructor() {
        this.data = null;
        this.message = "";
        this.result_code = Constants.RESULT_CODE_OK;
        this.total = 0;
        this.limit = 0;
        this.offset = 0;
    }


    public getArrIds(): Array<string> {
        return this.arrIds;
    }

    public setArrIds(arrIds: Array<string>): void {
        this.arrIds = arrIds;
    }



    public getErrorCode(): string {
        return this.errorCode;
    }

    public setErrorCode(errorCode: string): void {
        this.errorCode = errorCode;
    }

    public getErrorConstant(): string {
        return this.errorConstant;
    }

    public setErrorConstant(errorConstant: string): void {
        this.errorConstant = errorConstant;
    }


    public getError(): any {
        return this.error;
    }

    public setError(error: any): void {
        this.error = error;
    }

    public getTotal(): number {
        return this.total;
    }

    public setTotal(total: number): void {
        this.total = total;
    }

    public getResult_code(): string {
        return this.result_code;
    }

    public setResult_code(result_code: string): void {
        this.result_code = result_code;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public getLimit(): number {
        return this.limit;
    }

    public setLimit(limit: number): void {
        this.limit = limit;
    }

    public getOffset(): number {
        return this.offset;
    }

    public setOffset(offset: number): void {
        this.offset = offset;
    }

    public getData(): any {
        return this.data;
    }

    public async setData(data: any): Promise<void> {
        const encryptedData = await ServiceFactory.getEncryptionService().encrypt(JSON.stringify(data));
        this.data = Config.getInstance().isLocalDevelopment() ? data : encryptedData;
        // this.data = data;
    }
}