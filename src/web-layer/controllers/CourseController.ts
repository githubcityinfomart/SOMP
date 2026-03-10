import { JsonController, Post, Put, Delete, Get, UploadedFile, Body, Param, QueryParams } from 'routing-controllers';
import { CourseService } from '../../service-layer/implementations/CourseService';
import { CourseResponseModel } from '../../service-layer/models/CourseResponseModel';
import { FileUploadService } from '../../common/utils/FileUploadUtility';
import { GoogleDriveService } from '../../common/utils/GoogleDriveUtility';
import { Constants } from "../../common/utils/Constants";
import { AccessControl } from "../../common/utils/AccessControlUtils";
import { AppPermission } from "../../service-layer/implementations/JWTTokenService";

@JsonController(Constants.ROUTER_PREFIX + "/courses")
export class CourseController {
    private readonly courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

 
    @Get('/list')
    async list(@QueryParams() query: any): Promise<{ data: CourseResponseModel[]; total: number }> {
        const { category = 'all', page = 1, limit = 10 } = query;
        const result = await this.courseService.listCourses(category as any, Number(page), Number(limit));
        
        const dataWithMetadata = await Promise.all(
            result.data.map(async (item: any) => {
                const responseModel = new CourseResponseModel(item);
                
                if (item.thumbnail && item.thumbnail.length > 0) {
                    try {
                        const fileId = GoogleDriveService.extractFileId(item.thumbnail);
                        if (fileId) {
                            const fileMetadata = await GoogleDriveService.getFile(fileId);
                            responseModel['fileMetadata'] = fileMetadata;
                        }
                    } catch (error) {
                        console.error('[CourseController] Error fetching file metadata:', error);
                    }
                }
                
                return responseModel;
            })
        );
        
        return {
            data: dataWithMetadata,
            total: result.total
        };
    }

    @Get('/get/:id')
    async get(@Param('id') id: string): Promise<CourseResponseModel> {
        const result = await this.courseService.getCourseById(id);
        return new CourseResponseModel(result);
    }
    
    @Post("/add")
    @AccessControl({ permissions: [AppPermission.Admin] })
    async add(@UploadedFile('thumbnail', { required: false }) file: any, @Body() body: any): Promise<CourseResponseModel> {
        let thumbnail = '';
        if (file) {
            thumbnail = await FileUploadService.handleFileUpload(file);
        }
        const batches = typeof body.batches === 'string' ? JSON.parse(body.batches) : body.batches;
        
        const data = { ...body, thumbnail, batches };
        const result = await this.courseService.addCourse(data);
        return new CourseResponseModel(result);
    }


    @Put('/edit/:id')
    @AccessControl({ permissions: [AppPermission.Admin] })
    async edit(@Param('id') id: string, @UploadedFile('thumbnail', { required: false }) file: any, @Body() body: any): Promise<CourseResponseModel> {
        let thumbnail = body.thumbnail || '';
        
        if (file) {
            if (thumbnail && thumbnail.length > 0) {
                try {
                    const oldFileId = GoogleDriveService.extractFileId(thumbnail);
                    if (oldFileId) {
                        await GoogleDriveService.deleteFile(oldFileId);
                    }
                } catch (error) {
                    console.error('[CourseController] Error deleting old thumbnail:', error);
                }
            }
            
            thumbnail = await FileUploadService.handleFileUpload(file);
        }
        
        const batches = typeof body.batches === 'string' ? JSON.parse(body.batches) : body.batches;
        
        const data = { ...body, thumbnail, batches };
        const result = await this.courseService.editCourse(id, data);
        return new CourseResponseModel(result);
    }

    @Delete('/delete/:id')
    @AccessControl({ permissions: [AppPermission.Admin] })
    async delete(@Param('id') id: string): Promise<{ success: boolean }> {
        const course = await this.courseService.getCourseById(id);
        
        if (course && course.thumbnail && course.thumbnail.length > 0) {
            try {
                const fileId = GoogleDriveService.extractFileId(course.thumbnail);
                if (fileId) {
                    await GoogleDriveService.deleteFile(fileId);
                }
            } catch (error) {
                console.error('[CourseController] Error deleting thumbnail from Google Drive:', error);
            }
        }
        
        const result = await this.courseService.deleteCourse(id);
        return { success: result };
    }
}
