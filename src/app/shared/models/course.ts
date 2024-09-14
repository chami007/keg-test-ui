export class Course {
    constructor(
        public courseId: string,
        public instituteName: string,
        public courseName: string,
        public category: string,
        public deliveryMethod: string,
        public location: string,
        public language: string,
        public startDate: Date
    ) { }

}