import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private BASE_URL= "https://fakestoreapi.com/products"
  //private _http = inject(HttpClient);
  constructor(private http: HttpClient) { }

  /*prueba(){
    this.http;
  }*/
  getAll(){
    return this.http.get<Product[]>(this.BASE_URL);
  }
  getAllCategoty(){
    return this.http.get<string[]>(`${this.BASE_URL}/categories`);
  }
  getAllByCategoty(category: string){
    return this.http.get<Product[]>(`${this.BASE_URL}/category/${category}`);
  }
  getById(id: number){
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }
}
