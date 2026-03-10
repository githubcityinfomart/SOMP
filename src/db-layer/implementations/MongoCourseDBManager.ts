import mongoose from 'mongoose';
import { CourseSchema } from '../models/DBCourse';
import { ICourseDBManager } from '../interfaces/ICourseDBManager';
import { DBConstants } from '../models/DBConstants';
import { CourseUtility } from '../../common/utils/CourseUtility';
import { CourseResponseModel } from '../../service-layer/models/CourseResponseModel';

export class MongoCourseDBManager implements ICourseDBManager {
    private courseDB: any;

    constructor() {
        this.courseDB = mongoose.model(DBConstants.CoursesCollection, CourseSchema);
    }

    public async addCourse(data: any): Promise<CourseResponseModel> {
        const courseData = {
            course_title: data.course_title,
            category: data.category,
            target_exam_year: data.target_exam_year,
            short_description: data.short_description,
            course_link: data.course_link,
            thumbnail: data.thumbnail,
            standard_price: data.standard_price,
            discounted_price: data.discounted_price,
            batches: data.batches || [],
            status: 'active',
            created_at: new Date(),
            updated_at: new Date()
        };
        const result = await this.courseDB.create(courseData);
        return CourseUtility.getCourseModelBasicDetails(result);
    }

    public async editCourse(id: string, data: any): Promise<CourseResponseModel | null> {
    const updateData: any = {
        updated_at: new Date()
    };

    if (data.course_title !== undefined) updateData.course_title = data.course_title;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.target_exam_year !== undefined) updateData.target_exam_year = data.target_exam_year;
    if (data.short_description !== undefined) updateData.short_description = data.short_description;
    if (data.course_link !== undefined) updateData.course_link = data.course_link;
    if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
    if (data.standard_price !== undefined) updateData.standard_price = data.standard_price;
    if (data.discounted_price !== undefined) updateData.discounted_price = data.discounted_price;
    if (data.batches !== undefined) {
        updateData.batches = data.batches;
    }

    const result = await this.courseDB.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    return result ? CourseUtility.getCourseModelBasicDetails(result) : null;
}

    public async deleteCourse(id: string): Promise<boolean> {
        const result = await this.courseDB.findByIdAndDelete(id);
        return !!result;
    }

    public async listCourses(query: any, page: number, limit: number): Promise<{ data: CourseResponseModel[]; total: number }> {
        const filter = { ...query, status: 'active' };
        const total = await this.courseDB.countDocuments(filter);
        const data = await this.courseDB.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ created_at: -1 });
        return { data: data.map((item: any) => CourseUtility.getCourseModelBasicDetails(item)), total };
    }

    public async getCourseById(id: string): Promise<CourseResponseModel | null> {
        const course = await this.courseDB.findById(id);
        return course ? CourseUtility.getCourseModelBasicDetails(course) : null;
    }
}
