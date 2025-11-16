import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CartItem } from '../../api/model/cart-item';
import { CartService } from '../../api/services/cart.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CurrencyPipe, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  items: CartItem[] = [];
displayedColumns = ["Image", "Title", "Price", "Cantidad", "Total", "Action"]
  constructor(private cartService: CartService){

    this.cartService.getItems()
    .subscribe(data => {
      this.items = data;
    });
  }
  deleteItem(id: number){
    this.cartService.DeletenItem(id);
    this.items = this.items.filter(i => i.id !== id);
  }
}
