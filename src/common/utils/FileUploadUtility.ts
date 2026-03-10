import { GoogleDriveService } from './GoogleDriveUtility';
import fs from 'fs';
import path from 'path';

export class FileUploadService {
  /**
   * Upload a file to Google Drive
   * @param file - The file object from multer or a buffer with filename
   * @param fileName - Optional filename override
   * @param folderId - Optional Google Drive folder ID
   * @returns The file URL from Google Drive
   */
  static async handleFileUpload(
    file: any,
    fileName?: string,
    folderId?: string
  ): Promise<string> {
    if (!file) {
      return '';
    }

    try {
      const filename = fileName || file.originalname || file.filename || 'upload-file';
      let filePath: string | null = null;
      if (file.path && typeof file.path === 'string') {
        filePath = file.path;
      }
      else if (file.buffer && Buffer.isBuffer(file.buffer)) {
        filePath = await this.createTempFile(file.buffer, filename);
      }
      else if (file.stream) {
        filePath = await this.createTempFileFromStream(file.stream, filename);
      }
      else if (file.destination && file.filename) {
        filePath = path.join(file.destination, file.filename);
      }

      if (!filePath) {
        throw new Error('Unable to determine file path. File object structure is invalid.');
      }

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at path: ${filePath}`);
      }

      const driveUrl = await GoogleDriveService.uploadFile(filePath, filename, folderId);
      if (file.buffer && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn(`Failed to clean up temp file: ${filePath}`, err);
        }
      }

      return driveUrl;
    } catch (error) {
      console.error('File upload error:', error);
      throw new Error(`File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static async createTempFile(buffer: Buffer, filename: string): Promise<string> {
    const tempDir = path.join(process.cwd(), 'temp-uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const filePath = path.join(tempDir, `${Date.now()}-${filename}`);
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }

  private static async createTempFileFromStream(stream: any, filename: string): Promise<string> {
    const tempDir = path.join(process.cwd(), 'temp-uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const filePath = path.join(tempDir, `${Date.now()}-${filename}`);

    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      stream.pipe(writeStream);
      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', reject);
    });
  }
}
