import { IEncryptionService } from "../../service-layer/interfaces/IEncryptionService";
import { Config } from "../../config/config";

var CryptoJS = require("crypto-js");
export class EncryptionService implements IEncryptionService {

    private key: any
    private iv: any
    constructor() {
        this.key = CryptoJS.enc.Hex.parse(Config.getInstance().getEncryptionKey());
        this.iv = CryptoJS.enc.Hex.parse(Config.getInstance().getEncryptionIV());
    }

    public async encrypt(text: string): Promise<string> {
        var encrypted = CryptoJS.AES.encrypt(text, this.key, { iv: this.iv });
        let encdata = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
        return encdata;
    }

    public async decrypt(encryptedText: string): Promise<string> {
        var decrypted = CryptoJS.AES.decrypt(encryptedText, this.key, { iv: this.iv });
        return (decrypted.toString(CryptoJS.enc.Utf8));
    }
}