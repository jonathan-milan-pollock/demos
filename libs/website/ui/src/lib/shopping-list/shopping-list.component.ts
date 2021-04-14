import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
