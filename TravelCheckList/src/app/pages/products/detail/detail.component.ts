import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductsService } from '../../../api/services/products.service';
import { Product } from '../../../api/model/product';
import { MatChip } from '@angular/material/chips';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../api/services/cart.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//import { ActivatedRoute } from '@angular/router'; // forma antigua

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatChip, CurrencyPipe,MatIconModule, MatProgressSpinnerModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  @Input() id: number = 0;

  product?: Product;

  constructor(private productService: ProductsService, private cartSevice: CartService) {

  }

  ngOnInit(): void {
    this.productService.getById(this.id)
      .subscribe({
        next: data => {
          this.product = data;
        },
        error: err => {
          console.error(err);
        }
      });
  }
  addToCart(){
    this.cartSevice.AddItem({
      id: this.product!.id,
      title: this.product!.title,
      image: this.product!.image,
      price: this.product!.price,
      cantidad: 1
    })
  }
  /*constructor(private activatrRoute: ActivatedRoute){ //forma antigua
    const id = this.activatrRoute.snapshot.paramMap.get('id');
    console.log(id);
  }*/
}
