import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api: string = "http://localhost:8080/api/products";

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product []>{
    return this.http.get<Product[]>(this.api);
  }
  postProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(this.api, product);
  }

  deleteProductById(id: number):Observable<any>{
    return this.http.delete(this.api+`/${id}`);
  }

  editProductById(product: Product, id: number):Observable<any>{
    return this.http.put(this.api+`/${id}`, product);
  }
}
