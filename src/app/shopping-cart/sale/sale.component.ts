import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  feedbackForm: FormGroup;
  feedbackEntries: any[] = [
    { name: 'Taha', feedback: 'Great experience! Highly recommended.' },
    { name: 'mortadha', feedback: 'Excellent service and quality products.' },
    // Add more default entries as needed
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      feedback: ['', Validators.required],
    });
  }

  submitFeedback(): void {
    if (this.feedbackForm.valid) {
      const newFeedback = this.feedbackForm.value;
      this.feedbackEntries.push(newFeedback);

      // Clear the form for the next entry
      this.feedbackForm.reset();
    }
  }
}
