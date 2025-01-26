import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../interfaces/product.interface';
import { CreateProduct } from '../interfaces/createProduct.interface';
import { EventEmitter } from 'stream';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  // @Output()
  // public onValue = new EventEmitter();

  title_add: string = 'Formulario de creación de producto'
  public product: Product = {
    id:0,
    product_name: '',
    categori:'',
    price: 0,
    cantidad_stock:0,
  };


  public createProduct: CreateProduct = {
    product_name:'',
    categori:'',
    price: 0,
    cantidad_stock: 0
  }

  constructor(private productService: ProductService,
              private activeteRoute: ActivatedRoute,
              private router: Router
            )
  {

  }

  ngOnInit(): void {

  }


  addproduct(){
    const { product_name, categori, price, cantidad_stock} = this.product;

    this.createProduct =  {product_name,categori, price, cantidad_stock}

    this.product = {
      id:0,
      product_name: '',
      categori:'',
      price: 0,
      cantidad_stock:0,
    };
    this.productService.postProduct(this.createProduct)
      .subscribe(rest=>console.log(rest));
  }

}
