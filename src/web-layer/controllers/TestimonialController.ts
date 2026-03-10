import { JsonController, Post, Put, Delete, Get, UploadedFile, Body, Param, QueryParams } from 'routing-controllers';
import { TestimonialService } from '../../service-layer/implementations/TestimonialService';
import { TestimonialResponseModel } from '../../service-layer/models/TestimonialResponseModel';
import { FileUploadService } from '../../common/utils/FileUploadUtility';
import { GoogleDriveService } from '../../common/utils/GoogleDriveUtility';
import { Constants } from "../../common/utils/Constants";
import { AccessControl } from "../../common/utils/AccessControlUtils";
import { AppPermission } from "../../service-layer/implementations/JWTTokenService";

@JsonController(Constants.ROUTER_PREFIX + "/testimonials")
export class TestimonialController {
    private readonly testimonialService: TestimonialService;

    constructor() {
        this.testimonialService = new TestimonialService();
    }

    @Get('/list')
    async list(@QueryParams() query: any): Promise<{ data: TestimonialResponseModel[]; total: number }> {
        const { type = 'all', page = 1, limit = 10 } = query;
        const result = await this.testimonialService.listTestimonials(type as any, Number(page), Number(limit));
        const dataWithMetadata = await Promise.all(
            result.data.map(async (item: any) => {
                const responseModel = new TestimonialResponseModel(item);
                if (item.image && item.image.length > 0) {
                    try {
                        const fileId = GoogleDriveService.extractFileId(item.image);
                        if (fileId) {
                            const fileMetadata = await GoogleDriveService.getFile(fileId);
                            responseModel['fileMetadata'] = fileMetadata;
                        }
                    } catch (error) {
                        console.error('[TestimonialController] Error fetching file metadata:', error);
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

    @Post("/add")
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async add(@UploadedFile('image', { required: false }) file: any, @Body() body: any): Promise<TestimonialResponseModel> {
        let image = '';
        if (file) {
            image = await FileUploadService.handleFileUpload(file);
        }
        const data = { ...body, image };
        const result = await this.testimonialService.addTestimonial(data);
        return new TestimonialResponseModel(result);
    }


    @Put('/edit/:id')
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async edit(@Param('id') id: string, @UploadedFile('image', { required: false }) file: any, @Body() body: any): Promise<TestimonialResponseModel> {
        let image = body.image || '';
        
        if (file) {
            if (image && image.length > 0) {
                try {
                    const oldFileId = GoogleDriveService.extractFileId(image);
                    if (oldFileId) {
                        await GoogleDriveService.deleteFile(oldFileId);
                    }
                } catch (error) {
                    console.error('[TestimonialController] Error deleting old image:', error);
                }
            }
            
            image = await FileUploadService.handleFileUpload(file);
        }
        
        const data = { ...body, image };
        const result = await this.testimonialService.editTestimonial(id, data);
        return new TestimonialResponseModel(result);
    }

    @Delete('/delete/:id')
    @AccessControl({ permissions: [AppPermission.Admin] })
    public async delete(@Param('id') id: string): Promise<{ success: boolean }> {
        const testimonial = await this.testimonialService.getTestimonialById(id);
        if (testimonial && testimonial.image && testimonial.image.length > 0) {
            try {
                const fileId = GoogleDriveService.extractFileId(testimonial.image);
                if (fileId) {
                    await GoogleDriveService.deleteFile(fileId);
                }
            } catch (error) {
                console.error('[TestimonialController] Error deleting image from Google Drive:', error);
            }
        }
        
        const result = await this.testimonialService.deleteTestimonial(id);
        return { success: result };
    }
}
