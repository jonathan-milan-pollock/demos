import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Review } from '@dark-rush-photography/shared-types';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'drp-open-review-dialog-button',
  templateUrl: './open-review-dialog-button.component.html',
  styleUrls: ['./open-review-dialog-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenReviewDialogButtonComponent {
  @Output() reviewSubmitted = new EventEmitter<Review>();

  constructor(private dialog: MatDialog) {}

  openAddReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: { review: {} as Review },
    });

    dialogRef.afterClosed().subscribe((result: Review) => {
      if (!result) return;
      this.reviewSubmitted.emit(result);
    });
  }
}
