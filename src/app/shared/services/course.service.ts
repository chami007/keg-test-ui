import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Response } from '../response';
import { ContactUs } from '../models/contact-us';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // move to environment variable
  private apiUrl = 'https://localhost:7263/api';

  constructor(private http: HttpClient) { }

  getData(pageIndex: number, pageSize: number, searchFilter: string): Observable<Response<Course[]>> {
    return this.http.get<Response<Course[]>>(`${this.apiUrl}/courses?offset=${pageIndex}&pageSize=${pageSize}&searchFilter=${searchFilter}`);
  }

  contactUsFormSubmit(contactUsData: ContactUs): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses`, contactUsData);
  }

}

export const mockCourses: Course[] = [
  new Course(
    '1A2B3C4D-1234-5678-9ABC-DEF123456789',
    'Tech University',
    'Computer Science 101',
    'IT / Software Development',
    'Online',
    'New York',
    'English',
    new Date('2024-09-15')
  ),
  new Course(
    '2B3C4D5E-2345-6789-ABCD-EF123456789A',
    'Health Academy',
    'Nursing Foundations',
    'Healthcare / Medicine',
    'In-Person',
    'Chicago',
    'English',
    new Date('2024-10-01')
  ),
  new Course(
    '3C4D5E6F-3456-789A-BCDE-F123456789AB',
    'Business Institute',
    'Business Management',
    'Business / Management',
    'Hybrid',
    'San Francisco',
    'English',
    new Date('2024-11-05')
  ),
  new Course(
    '4D5E6F7G-4567-89AB-CDEF-123456789ABC',
    'Arts Academy',
    'Graphic Design Basics',
    'Creative Arts / Design',
    'In-Person',
    'Los Angeles',
    'English',
    new Date('2024-09-20')
  ),
  new Course(
    '5E6F7G8H-5678-9ABC-DEFA-23456789BCDE',
    'Language School',
    'Spanish for Beginners',
    'Languages',
    'Online',
    'Miami',
    'Spanish',
    new Date('2024-09-25')
  ),
  new Course(
    '6F7G8H9I-6789-ABCD-EFAB-3456789CDEFA',
    'Environmental College',
    'Climate Change and Sustainability',
    'Environmental Studies',
    'In-Person',
    'Seattle',
    'English',
    new Date('2024-10-12')
  ),
  new Course(
    '7G8H9I0J-789A-BCDE-FABC-456789DEF123',
    'Music Conservatory',
    'Introduction to Piano',
    'Music / Performing Arts',
    'In-Person',
    'Austin',
    'English',
    new Date('2024-09-18')
  ),
  new Course(
    '8H9I0J1K-89AB-CDEF-BCDE-56789F012345',
    'Culinary School',
    'Basic Culinary Techniques',
    'Culinary Arts',
    'Hybrid',
    'Boston',
    'English',
    new Date('2024-11-01')
  ),
  new Course(
    '9I0J1K2L-9ABC-DEF1-CDEF-6789A0123456',
    'Fashion Academy',
    'Fashion Design Fundamentals',
    'Fashion / Textiles',
    'In-Person',
    'Los Angeles',
    'English',
    new Date('2024-10-22')
  ),
  new Course(
    '0J1K2L3M-ABC1-DEF2-F123-789A01234567',
    'History Institute',
    'World History Overview',
    'Humanities / History',
    'Online',
    'Philadelphia',
    'English',
    new Date('2024-09-30')
  )
];