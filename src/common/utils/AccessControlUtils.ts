import { Authorized } from "routing-controllers";
import { AppPermission } from "../../service-layer/implementations/JWTTokenService";
export interface AccessControlMetaData {
    permissions?: AppPermission[];
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function AccessControl(meta: AccessControlMetaData): Function {
    return Authorized(meta);
}