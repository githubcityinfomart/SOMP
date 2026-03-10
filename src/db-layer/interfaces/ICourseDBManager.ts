import { CourseResponseModel } from '../../service-layer/models/CourseResponseModel';

export interface ICourseDBManager {
    addCourse(data: any): Promise<CourseResponseModel>;
    editCourse(id: string, data: any): Promise<CourseResponseModel | null>;
    deleteCourse(id: string): Promise<boolean>;
    listCourses(query: any, page: number, limit: number): Promise<{ data: CourseResponseModel[]; total: number }>;
    getCourseById(id: string): Promise<CourseResponseModel | null>;
}
