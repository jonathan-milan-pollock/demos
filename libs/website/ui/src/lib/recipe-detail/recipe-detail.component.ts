import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
