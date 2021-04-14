import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'drp-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'
    ),
  ];
}
