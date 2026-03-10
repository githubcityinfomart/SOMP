import { ObjectStatus, ServiceObject } from "../../service-layer/models/ServiceObject";
import { Utils } from "./Utils";
export class Utility {
    constructor() {

    }

    public static setServiceObjectProperties(object: ServiceObject, item: any): void {
        const id = item._id != null ? item._id : item.id;
        if (id) {
            object.setId(Utility.getStringId(id));
        }
        object.setEnable(item.enable);
        object.setCreatedAt(item.createdAt);
        object.setLastModifiedAt(item.updatedAt ? item.updatedAt : item.lastModifiedAt);
        object.setStatus(Utils.parseDefaultEnum(item.status, ObjectStatus, ObjectStatus.Active));
    }
    public static setServiceObjectPropertiesOnlyId(object: ServiceObject, item: any): void {
        const id = item._id != null ? item._id : item.id;
        if (id) {
            object.setId(Utility.getStringId(id));
        }
    }
    public static getStringId(id: any): string {
        return id != null ? (id).toString() : null;
    }
    public static getListOfItems<T>(itemsArray: any, getItem: (item: any) => T): Array<T> {
        if (itemsArray == undefined || itemsArray == null) {
            return [];
        }

        let items: Array<T> = itemsArray.map(it => {
            return getItem(it);
        });

        return items;
    }



    public static normalizeMongoId(id: any): string | null {
        if (!id) return null;
        if (typeof id === 'object' && typeof id.toString === 'function') {
            return id.toString();
        }
        if (typeof id === 'string') {
            return id.trim();
        }
        return String(id);
    }


}
