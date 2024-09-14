import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from '../shared/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let courseService: CourseService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let paginator: MatPaginator;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, MatPaginatorModule, ReactiveFormsModule],
      declarations: [CoursesListComponent],
      providers: [provideHttpClient(),
      provideHttpClientTesting(),
        CourseService,
      { provide: MatDialog, useValue: {} },
      { provide: MatSnackBar, useValue: {} },
      { provide: MatPaginator, useValue: {} },
      provideAnimations()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);
    paginator = TestBed.inject(MatPaginator);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize search control', () => {
    expect(component.searchControl).toBeTruthy();
    expect(component.searchControl.value).toBe('');
  });
});
