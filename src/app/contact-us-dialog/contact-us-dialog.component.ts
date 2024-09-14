import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactUs } from '../shared/models/contact-us';
import { CourseService } from '../shared/services/course.service';

@Component({
  selector: 'app-contact-us-dialog',
  templateUrl: './contact-us-dialog.component.html',
  styleUrl: './contact-us-dialog.component.css'
})
export class ContactUsDialogComponent {
  contactForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { courseId: string, courseName: string, instituteName: string },
    private dialogRef: MatDialogRef<ContactUsDialogComponent>,
    private courseService: CourseService,
    private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[- +()0-9]+$')]],
      message: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formValue: ContactUs = {
        courseId: this.data.courseId,
        email: this.contactForm.value.email,
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        message: this.contactForm.value.message,
        phone: this.contactForm.value.phone
      };
      console.log(formValue)
      this.courseService.contactUsFormSubmit(formValue).subscribe(
        _ => {
          this.dialogRef.close(true);
        }
      )
    }
  }
}
