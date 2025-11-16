import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.LoadItem();
  }

  getCount() {
    if (this.items.length === 0) {
      return 0;
    }

    return this.items
    .map(i => i.cantidad)
    .reduce((a, b) => a + b, 0)
  }
  getItems(){
    return of(this.items);
  }
  private items: CartItem[] = [];

  private LoadItem() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    }
  }
  private SaveItems() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  AddItem(item: CartItem) {
    const index = this.items
      .findIndex(i => i.id === item.id);

    if (index >= 0) {
      this.items[index].cantidad += item.cantidad;
      this.items[index].total = this.items[index].cantidad * this.items[index].price;
    }
    else {
      item.total = item.cantidad * item.price;
      this.items.push(item);
    }

    this.SaveItems();
  }
  DeletenItem(id: number) {
    this.items = this.items
      .filter(i => i.id !== id);

    this.SaveItems();
  }
}
