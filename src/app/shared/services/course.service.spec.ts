import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { provideHttpClient } from '@angular/common/http';
import { ContactUs } from '../models/contact-us';

describe('CourseService', () => {
    let service: CourseService;
    let httpMock: HttpTestingController;

    const apiUrl = 'https://localhost:7263/api'

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            providers: [CourseService, provideHttpClient(), provideHttpClientTesting()]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(CourseService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getData with correct parameters', () => {
        const pageIndex = 1;
        const pageSize = 10;
        const searchFilter = 'course name';

        service.getData(pageIndex, pageSize, searchFilter).subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${apiUrl}/courses?offset=${pageIndex}&pageSize=${pageSize}&searchFilter=${searchFilter}`);
        expect(req.request.method).toBe('GET');
    });

    it('should call contactUsFormSubmit with correct parameters', () => {
        const contactUsData: ContactUs = { courseId: '1254', firstName: 'Chamal', lastName: 'Lianage', email: 'chami@fau.com', phone: '12354', message: 'message' };

        service.contactUsFormSubmit(contactUsData).subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${apiUrl}/courses`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(contactUsData);
    });
});