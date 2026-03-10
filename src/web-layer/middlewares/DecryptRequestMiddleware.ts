import { NextFunction, Request, Response } from 'express';
import { Middleware } from 'routing-controllers';
import { Config } from '../../config/config';
import { MyError } from '../../common/MyError';
var CryptoJS = require("crypto-js");

@Middleware({ type: 'before' })
export class DecryptRequestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        if (req.is('multipart/form-data') || req.is('application/x-www-form-urlencoded')) {
            return next();
        }

        if (req.body) {
            try {
                if (req.body.encData) {
                    const decryptedBody = this.decryptRequest(req.body.encData);
                    req.body = JSON.parse(decryptedBody);
                } else {
                    req.body = req.body;
                }
            } catch (error) {
                console.error('Decryption failed, passing the original body:', error);
                throw new MyError("Bad Request")
            }
        }
        next();
    }

    decryptRequest(body: string): string {
        if (!body || typeof body !== 'string') {
            throw new Error('Invalid body for decryption');
        }

        try {
            let key = Config.getInstance().getEncryptionKey()
            let iv = Config.getInstance().getEncryptionIV()
            const bytes = CryptoJS.AES.decrypt(
                body,
                CryptoJS.enc.Hex.parse(key),
                { iv: CryptoJS.enc.Hex.parse(iv) }
            );

            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                throw new Error('Decryption returned empty result');
            }

            return decrypted;
        } catch (error) {
            console.error('Error decrypting request body:', error);
            throw new Error('Failed to decrypt request body');
        }
    }
}
