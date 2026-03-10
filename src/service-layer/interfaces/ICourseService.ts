export interface ICourseService {
    addCourse(data: any): Promise<any>;
    editCourse(id: string, data: any): Promise<any>;
    deleteCourse(id: string): Promise<boolean>;
    listCourses(category: string | 'all', page: number, limit: number): Promise<{ data: any[]; total: number }>;
    getCourseById(id: string): Promise<any>;
}
