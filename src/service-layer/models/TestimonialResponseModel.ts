export class TestimonialResponseModel {

  private _id: string;
  private _name: string;
  private _rank: string;
  private _exam_year: number;
  private _exam_name: string;
  private _designation: string;
  private _message: string;
  private _image?: string;
  private _is_featured: boolean;
  private _is_testimonial: boolean;
  private _status: 'active' | 'deleted';
  private _created_at: Date;
  private _updated_at: Date;

  constructor(data: any) {
    this._id = data._id || data.id;
    this._name = data.name;
    this._rank = data.rank;
    this._exam_year = data.exam_year;
    this._exam_name = data.exam_name;
    this._designation = data.designation;
    this._message = data.message;
    this._image = data.image;
    this._is_featured = data.is_featured;
    this._is_testimonial = data.is_testimonial;
    this._status = data.status;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get rank(): string {
    return this._rank;
  }
  set rank(value: string) {
    this._rank = value;
  }

  get exam_year(): number {
    return this._exam_year;
  }
  set exam_year(value: number) {
    this._exam_year = value;
  }

  get exam_name(): string {
    return this._exam_name;
  }
  set exam_name(value: string) {
    this._exam_name = value;
  }

  get designation(): string {
    return this._designation;
  }
  set designation(value: string) {
    this._designation = value;
  }

  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  get image(): string | undefined {
    return this._image;
  }
  set image(value: string | undefined) {
    this._image = value;
  }

  get is_featured(): boolean {
    return this._is_featured;
  }
  set is_featured(value: boolean) {
    this._is_featured = value;
  }

  get is_testimonial(): boolean {
    return this._is_testimonial;
  }
  set is_testimonial(value: boolean) {
    this._is_testimonial = value;
  }

  get status(): 'active' | 'deleted' {
    return this._status;
  }
  set status(value: 'active' | 'deleted') {
    this._status = value;
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
}