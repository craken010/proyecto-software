import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../api/model/product';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { CartService } from '../../../api/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, SlicePipe, CurrencyPipe, MatChipsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;

  constructor(private route: Router, private cartService: CartService){}

  ViewItem(){
    this.route.navigate(['products', this.product.id]);
  }
  addToCart(){
    this.cartService.AddItem({
      id: this.product.id,
      title: this.product.title,
      image: this.product.image,
      price: this.product.price,
      cantidad: 1
    })
  }
}
