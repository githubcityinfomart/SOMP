
import { HttpError } from "routing-controllers";
import { ResultModel } from "../service-layer/models/ResultModel";
import { Constants } from "./utils/Constants";
export class MyError extends HttpError {
  public operationName: string;
  public args: any[];

  constructor(operationName: string, args: any[] = []) {

    super(400);
    Object.setPrototypeOf(this, MyError.prototype);
    this.operationName = operationName;
    this.args = args; // can be used for internal logging
  }

  toJSON() {
    let result = new ResultModel();
    result.setResult_code(Constants.RESULT_CODE_FAILED);
    result.setMessage(this.operationName);
    result.setError(this.httpCode);
    return result;

  }
}