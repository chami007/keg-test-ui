import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsDialogComponent } from './contact-us-dialog.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ContactUsDialogComponent', () => {
  let component: ContactUsDialogComponent;
  let fixture: ComponentFixture<ContactUsDialogComponent>;
  let courseService: CourseService;
  let dialogRef: MatDialogRef<ContactUsDialogComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsDialogComponent],
      imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      providers: [provideHttpClient(),
      provideHttpClientTesting(),
        CourseService,
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} },
      provideAnimations()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactUsDialogComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    dialogRef = TestBed.inject(MatDialogRef);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create contact form', () => {
    expect(component.contactForm).toBeTruthy();
    expect(component.contactForm.contains('firstName')).toBeTruthy();
    expect(component.contactForm.contains('lastName')).toBeTruthy();
    expect(component.contactForm.contains('email')).toBeTruthy();
    expect(component.contactForm.contains('phone')).toBeTruthy();
    expect(component.contactForm.contains('message')).toBeTruthy();
  });
});
