import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoriesComponent {
  constructor(private router: Router) {}

  onStoryClicked(): void {
    console.log('story clicked');
    this.router.navigate(['/stories', '1']);
  }
}
