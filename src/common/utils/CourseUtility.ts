import { CourseResponseModel } from '../../service-layer/models/CourseResponseModel';

export class CourseUtility {
    public static getCourseModelBasicDetails(data: any): CourseResponseModel {
        return new CourseResponseModel(data);
    }
}
