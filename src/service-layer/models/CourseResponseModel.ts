export class CourseResponseModel {
    private _id: string;
    private _course_title: string;
    private _category: string;
    private _target_exam_year: string;
    private _short_description: string;
    private _course_link: string;
    private _thumbnail: string;
    private _standard_price: number;
    private _discounted_price: number;
    private _batches: Array<{
        batch_name: string;
        start_date: Date;
        limit: number;
    }>;
    private _created_at: Date;
    private _updated_at: Date;
    private _status: string;

    constructor(data: any) {
        this._id = data._id || data.id;
        this._course_title = data.course_title;
        this._category = data.category;
        this._target_exam_year = data.target_exam_year;
        this._short_description = data.short_description;
        this._course_link = data.course_link;
        this._thumbnail = data.thumbnail;
        this._standard_price = data.standard_price;
        this._discounted_price = data.discounted_price;
        this._batches = data.batches || [];
        this._created_at = data.created_at;
        this._updated_at = data.updated_at;
        this._status = data.status;
    }

    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }

    get course_title(): string {
        return this._course_title;
    }
    set course_title(value: string) {
        this._course_title = value;
    }

    get category(): string {
        return this._category;
    }
    set category(value: string) {
        this._category = value;
    }

    get target_exam_year(): string {
        return this._target_exam_year;
    }
    set target_exam_year(value: string) {
        this._target_exam_year = value;
    }

    get short_description(): string {
        return this._short_description;
    }
    set short_description(value: string) {
        this._short_description = value;
    }

    get course_link(): string {
        return this._course_link;
    }
    set course_link(value: string) {
        this._course_link = value;
    }

    get thumbnail(): string {
        return this._thumbnail;
    }
    set thumbnail(value: string) {
        this._thumbnail = value;
    }

    get standard_price(): number {
        return this._standard_price;
    }
    set standard_price(value: number) {
        this._standard_price = value;
    }

    get discounted_price(): number {
        return this._discounted_price;
    }
    set discounted_price(value: number) {
        this._discounted_price = value;
    }

    get batches(): Array<{ batch_name: string; start_date: Date; limit: number }> {
        return this._batches;
    }
    set batches(value: Array<{ batch_name: string; start_date: Date; limit: number }>) {
        this._batches = value;
    }

    get created_at(): Date {
        return this._created_at;
    }
    set created_at(value: Date) {
        this._created_at = value;
    }

    get updated_at(): Date {
        return this._updated_at;
    }
    set updated_at(value: Date) {
        this._updated_at = value;
    }

    get status(): string {
        return this._status;
    }
    set status(value: string) {
        this._status = value;
    }
}