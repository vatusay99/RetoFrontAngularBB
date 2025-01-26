import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../product/interfaces/product.interface';
import { CreateProduct } from '../product/interfaces/createProduct.interface';
import { environments } from '../../environments/environments';

@Injectable({providedIn: 'root'})
export class ProductService {

  public listProduct: Product []= [];

  private api: string = environments.baseUrl; // "http://localhost:8080/api/products";

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.api);
  }

  postProduct(product: CreateProduct):Observable<Product>{
    return this.http.post<Product>(this.api, product);
  }

  deleteProductById(id: number):Observable<any>{
    return this.http.delete(this.api+`/${id}`);
  }

  editProductById(product: Product, id: number):Observable<Product| undefined>{
    if(!id) throw Error("Id del producto es requerido");
    return this.http.put<Product>(this.api, product)
        .pipe(
            catchError(error => of(undefined))
        );
  }

  getProductById(id:string):Observable<Product | undefined>{
    return this.http.get<Product>(`${this.api}/${id}`)
              .pipe(
                catchError(error => of(undefined))
              )
  }
}
