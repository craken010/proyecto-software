import { Component } from '@angular/core';
import { ProductsService } from '../../api/services/products.service';
import {MatCardModule} from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../api/model/product';
import { ProductComponent } from './product/product.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-pages-product',
  standalone: true,
  imports: [ProductComponent, MatButtonToggleModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  categories: string[] = [];
  products: Product[] = [];
  constructor(private productsService: ProductsService){

    this.productsService.getAllCategoty().subscribe({
      next: data => {
        console.log('category: ', data);
        this.categories = data;
      },
      error: err => {err}
    })

  }
  OnCategoryChange(event: string){
    if(event){
      this.productsService.getAllByCategoty(event).subscribe({
        next: data => {
          console.log('category: ', data);
          this.products = data;
        },
        error: err => {err}
      })
    }
    else{
      this.productsService.getAll().subscribe({
        next: data => {
          console.log('products: ', data);
          this.products = data;
        },
        error: err => {err}
      })
    }
  }
}
