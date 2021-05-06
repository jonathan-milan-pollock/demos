import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'drp-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDialogComponent implements OnInit {
  reviewForm?: FormGroup;
  reviewGroup?: FormGroup;

  constructor(public dialogRef: MatDialogRef<ReviewDialogComponent>) {}

  ngOnInit(): void {
    this.reviewGroup = new FormGroup({
      slug: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    });

    this.reviewForm = new FormGroup({
      review: this.reviewGroup,
    });
  }

  onSubmit(): void {
    this.dialogRef.close({ ...this.reviewForm?.value });
    this.reviewForm?.reset();
  }
}
