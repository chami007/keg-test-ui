import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';
import { Course } from '../shared/models/course';
import { CourseService } from '../shared/services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit, AfterViewInit {

  searchControl = new FormControl('');
  totalItems: number = 0;
  isLoading = true;
  searchFilter = '';
  apiMessage = '';
  courses: Course[] = [];

  constructor(private courseService: CourseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadPageData(0, 10, this.searchFilter);

    this.searchControl.valueChanges.pipe(
      debounceTime(500),  // Adjust the debounce time in milliseconds
      distinctUntilChanged()  // Only trigger if the search term actually changes
    ).subscribe(searchValue => {
      this.applyFilter(searchValue ?? '');
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event) => {
      const pageIndex = event.pageIndex;
      const pageSize = event.pageSize;
      this.loadPageData(pageIndex, pageSize, this.searchFilter);
    });
  }

  contactUsDialog(courseId: string, courseName: string, instituteName: string): void {
    let dialogRef = this.dialog.open(ContactUsDialogComponent, {
      data: { courseId, courseName, instituteName },
    });

    dialogRef.afterClosed().subscribe((submitted: boolean) => {
      if (submitted) {
        this.snackBar.open('Thank you for your inquiry.', 'Dismiss', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar', 'snackbar-success'],
          duration: 3000
        });
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.searchFilter = filterValue.trim().toLowerCase();

    // Reset to the first page
    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.loadPageData(0, this.paginator.pageSize, this.searchFilter);
  }

  loadPageData(pageIndex: number, pageSize: number, searchFilter: string): void {
    this.isLoading = true;
    this.courseService.getData(pageIndex, pageSize, searchFilter).subscribe(
      res => {
        this.courses = res.data;
        this.totalItems = res.totalItems;
        this.isLoading = false;
        this.apiMessage = res.message;
      }
    );
  }
}
