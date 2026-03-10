import { TestimonialResponseModel } from "../../service-layer/models/TestimonialResponseModel";
import { Utility } from "./Utility";

export class TestimonialUtility extends Utility {
    constructor() {
        super();
    }

    public static getTestimonialResponseModel(data: any): TestimonialResponseModel {
        return new TestimonialResponseModel(data);
    }

    public static getTestimonialModelBasicDetails(data: any): TestimonialResponseModel {
        return new TestimonialResponseModel(data);
    }
}
