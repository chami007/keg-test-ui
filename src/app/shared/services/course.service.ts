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

  private apiUrl = 'http://localhost:5124/api';

  constructor(private http: HttpClient) { }

  getData(pageIndex: number, pageSize: number, searchFilter: string): Observable<Response<Course[]>> {
    return this.http.get<Response<Course[]>>(`${this.apiUrl}/courses?offset=${pageIndex}&pageSize=${pageSize}&searchFilter=${searchFilter}`);
  }

  contactUsFormSubmit(contactUsData: ContactUs): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses`, contactUsData);
  }

}
