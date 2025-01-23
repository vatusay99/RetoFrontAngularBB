import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../service/product.service';
import { log } from 'console';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  title_add: string = 'Formulario de creación de producto'

  id:number=0;
  product_name: string = 'default';
  category: string = '';
  price: number = 0;
  cantidad_stock: number= 0;

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {

  }

  addproduct(){
    let product = new Product(
      this.id,
      this.product_name,
      this.category,
      this.price,
      this.cantidad_stock,
    );
    console.log(product);
    this.productService.postProduct(product)
      .subscribe(rest=>console.log(rest));
  }

}
