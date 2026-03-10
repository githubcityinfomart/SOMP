import { ICourseService } from '../interfaces/ICourseService';
import { ICourseDBManager } from '../../db-layer/interfaces/ICourseDBManager';
import { MongoCourseDBManager } from '../../db-layer/implementations/MongoCourseDBManager';

export class CourseService implements ICourseService {
    private readonly courseDBManager: ICourseDBManager;

    constructor() {
        this.courseDBManager = new MongoCourseDBManager;
    }

    async addCourse(data: any) {
        return await this.courseDBManager.addCourse(data);
    }

    async editCourse(id: string, data: any) {
        return await this.courseDBManager.editCourse(id, data);
    }

    async deleteCourse(id: string): Promise<boolean> {
        return await this.courseDBManager.deleteCourse(id);
    }

    async listCourses(category: string | 'all', page: number, limit: number) {
        let query: any = {};
        if (category !== 'all' && category) {
            query.category = category;
        }
        return await this.courseDBManager.listCourses(query, page, limit);
    }

    async getCourseById(id: string) {
        return await this.courseDBManager.getCourseById(id);
    }
}
