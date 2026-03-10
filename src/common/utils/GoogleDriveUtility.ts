import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

const KEYFILEPATH = path.join(process.cwd(), 'google-drive-credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

/**
 * Comprehensive Google Drive Service
 * Provides centralized methods for all Google Drive operations
 */
export class GoogleDriveService {
  /**
   * Upload a file to Google Drive
   * @param localFilePath - Path to the local file to upload
   * @param fileName - Name for the file in Google Drive
   * @param folderId - Optional parent folder ID
   * @returns File URL or ID
   */
  static async uploadFile(
    localFilePath: string,
    fileName: string,
    folderId?: string
  ): Promise<string> {
    try {
      const fileMetadata: any = {
        name: fileName,
        ...(folderId ? { parents: [folderId] } : {}),
      };

      const media = {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(localFilePath),
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: 'id, webViewLink, webContentLink',
      });

      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }

      return response.data.webViewLink || response.data.webContentLink || response.data.id || '';
    } catch (error) {
      console.error('[GoogleDriveService] Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Upload a file from a Buffer or Stream
   * @param fileData - Buffer or Stream containing file data
   * @param fileName - Name for the file in Google Drive
   * @param folderId - Optional parent folder ID
   * @returns File URL or ID
   */
  static async uploadFromBuffer(
    fileData: Buffer | Readable,
    fileName: string,
    folderId?: string
  ): Promise<string> {
    try {
      const fileMetadata: any = {
        name: fileName,
        ...(folderId ? { parents: [folderId] } : {}),
      };

      const media = {
        mimeType: 'application/octet-stream',
        body: fileData,
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: 'id, webViewLink, webContentLink',
      });

      return response.data.webViewLink || response.data.webContentLink || response.data.id || '';
    } catch (error) {
      console.error('[GoogleDriveService] Error uploading from buffer:', error);
      throw error;
    }
  }

  /**
   * Delete a file from Google Drive
   * @param fileId - ID of the file to delete
   * @returns Success status
   */
  static async deleteFile(fileId: string): Promise<boolean> {
    try {
      await drive.files.delete({
        fileId,
      });
      console.log(`[GoogleDriveService] File deleted: ${fileId}`);
      return true;
    } catch (error) {
      console.error('[GoogleDriveService] Error deleting file:', error);
      throw error;
    }
  }

  /**
   * Get file metadata from Google Drive
   * @param fileId - ID of the file
   * @param fields - Specific fields to retrieve (default: id, name, webViewLink, webContentLink, createdTime, modifiedTime, size)
   * @returns File metadata
   */
  static async getFile(
    fileId: string,
    fields: string = 'id, name, webViewLink, webContentLink, createdTime, modifiedTime, size, mimeType'
  ): Promise<any> {
    try {
      const response = await drive.files.get({
        fileId,
        fields,
      });
      return response.data;
    } catch (error) {
      console.error('[GoogleDriveService] Error getting file:', error);
      throw error;
    }
  }

  /**
   * List files in a folder or search for files
   * @param query - Search query (e.g., "name contains 'example'")
   * @param folderId - Optional parent folder ID to limit search
   * @param pageSize - Number of results to return (default: 10)
   * @param pageToken - Token for pagination
   * @returns List of files with metadata
   */
  static async listFiles(
    query?: string,
    folderId?: string,
    pageSize: number = 10,
    pageToken?: string
  ): Promise<any> {
    try {
      let q = query || "trashed = false";
      
      if (folderId) {
        q = `${q} and '${folderId}' in parents`;
      }

      const response = await drive.files.list({
        q,
        spaces: 'drive',
        fields: 'files(id, name, webViewLink, webContentLink, createdTime, modifiedTime, size, mimeType)',
        pageSize,
        pageToken,
      });

      return {
        files: response.data.files || [],
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('[GoogleDriveService] Error listing files:', error);
      throw error;
    }
  }

  /**
   * Search for files by name
   * @param fileName - Name of the file to search for
   * @param folderId - Optional parent folder ID to limit search
   * @returns List of matching files
   */
  static async searchByName(
    fileName: string,
    folderId?: string
  ): Promise<any[]> {
    try {
      const query = `name contains '${fileName.replace(/'/g, "\\'")}'`;
      const result = await this.listFiles(query, folderId);
      return result.files;
    } catch (error) {
      console.error('[GoogleDriveService] Error searching files:', error);
      throw error;
    }
  }

  /**
   * Update file metadata in Google Drive
   * @param fileId - ID of the file to update
   * @param metadata - Object containing fields to update (name, description, properties, etc.)
   * @returns Updated file metadata
   */
  static async updateFile(
    fileId: string,
    metadata: any
  ): Promise<any> {
    try {
      const response = await drive.files.update({
        fileId,
        requestBody: metadata,
        fields: 'id, name, webViewLink, webContentLink, modifiedTime',
      });
      return response.data;
    } catch (error) {
      console.error('[GoogleDriveService] Error updating file:', error);
      throw error;
    }
  }

  /**
   * Download a file from Google Drive
   * @param fileId - ID of the file to download
   * @param savePath - Local path where to save the file
   * @returns Path to the downloaded file
   */
  static async downloadFile(
    fileId: string,
    savePath: string
  ): Promise<string> {
    try {
      const response = await drive.files.get(
        {
          fileId,
          alt: 'media',
        },
        { responseType: 'stream' }
      );

      return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(savePath);
        response.data
          .pipe(dest)
          .on('finish', () => {
            console.log(`[GoogleDriveService] File downloaded: ${savePath}`);
            resolve(savePath);
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error('[GoogleDriveService] Error downloading file:', error);
      throw error;
    }
  }

  /**
   * Move a file to a different folder
   * @param fileId - ID of the file to move
   * @param newFolderId - ID of the destination folder
   * @param previousParents - Comma-separated list of previous parent IDs (to remove)
   * @returns Updated file metadata
   */
  static async moveFile(
    fileId: string,
    newFolderId: string,
    previousParents?: string
  ): Promise<any> {
    try {
      const response = await drive.files.update({
        fileId,
        addParents: newFolderId,
        removeParents: previousParents,
        fields: 'id, parents, webViewLink, webContentLink',
      });
      return response.data;
    } catch (error) {
      console.error('[GoogleDriveService] Error moving file:', error);
      throw error;
    }
  }

  /**
   * Create a folder in Google Drive
   * @param folderName - Name of the folder to create
   * @param parentFolderId - Optional parent folder ID
   * @returns Folder ID
   */
  static async createFolder(
    folderName: string,
    parentFolderId?: string
  ): Promise<string> {
    try {
      const fileMetadata: any = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        ...(parentFolderId ? { parents: [parentFolderId] } : {}),
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      return response.data.id || '';
    } catch (error) {
      console.error('[GoogleDriveService] Error creating folder:', error);
      throw error;
    }
  }

  /**
   * Share a file with others
   * @param fileId - ID of the file to share
   * @param email - Email address to share with
   * @param role - Role (reader, commenter, writer, etc.)
   * @returns Permission details
   */
  static async shareFile(
    fileId: string,
    email: string,
    role: 'reader' | 'commenter' | 'writer' | 'owner' = 'reader'
  ): Promise<any> {
    try {
      const response = await drive.permissions.create({
        fileId,
        requestBody: {
          role,
          type: 'user',
          emailAddress: email,
        },
        fields: 'id, emailAddress, role',
      });
      return response.data;
    } catch (error) {
      console.error('[GoogleDriveService] Error sharing file:', error);
      throw error;
    }
  }

  /**
   * Copy a file in Google Drive
   * @param fileId - ID of the file to copy
   * @param newFileName - Name for the copied file
   * @param parentFolderId - Optional destination folder ID
   * @returns New file metadata
   */
  static async copyFile(
    fileId: string,
    newFileName: string,
    parentFolderId?: string
  ): Promise<any> {
    try {
      const fileMetadata: any = {
        name: newFileName,
        ...(parentFolderId ? { parents: [parentFolderId] } : {}),
      };

      const response = await drive.files.copy({
        fileId,
        requestBody: fileMetadata,
        fields: 'id, name, webViewLink, webContentLink',
      });

      return response.data;
    } catch (error) {
      console.error('[GoogleDriveService] Error copying file:', error);
      throw error;
    }
  }

  /**
   * Get file size
   * @param fileId - ID of the file
   * @returns File size in bytes
   */
  static async getFileSize(fileId: string): Promise<number> {
    try {
      const file = await this.getFile(fileId, 'size');
      return parseInt(file.size, 10) || 0;
    } catch (error) {
      console.error('[GoogleDriveService] Error getting file size:', error);
      throw error;
    }
  }

  /**
   * Extract file ID from Google Drive URL
   * @param url - Google Drive URL or file ID
   * @returns File ID
   */
  static extractFileId(url: string): string {
    if (url && !url.includes('/')) {
      return url;
    }
    const patterns = [
      /\/d\/([a-zA-Z0-9-_]+)/,  // /d/FILE_ID
      /id=([a-zA-Z0-9-_]+)/,     // id=FILE_ID
      /\/open\?id=([a-zA-Z0-9-_]+)/, // /open?id=FILE_ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return url;
  }
}
