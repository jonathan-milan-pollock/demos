import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeItemComponent {}
