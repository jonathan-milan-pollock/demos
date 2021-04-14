import { Component } from '@angular/core';

@Component({
  selector: 'drp-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productName = '';
  isDisabled = true;
  products = ['A Book', 'A Tree'];

  constructor() {
    setTimeout(() => {
      this.isDisabled = false;
    }, 3_000);
  }

  onAddProduct(): void {
    this.products.push(this.productName);
  }

  onRemoveProduct(productName: string): void {
    this.products = this.products.filter((p) => p != productName);
  }
}
