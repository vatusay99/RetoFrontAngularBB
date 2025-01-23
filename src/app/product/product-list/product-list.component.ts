import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../service/product.service';
import { log } from 'console';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  product: Product [] = [];
  id: number = 0;
  titulo_products: string = "Listado de productos";

  constructor(private productService: ProductService){}


  ngOnInit(): void {
    this.listProductService();
  }

  listProductService(){
    this.productService.getProducts().subscribe(
      data => {
        this.product = data;
        console.log("products:",this.product);
      }
    );
  }

  deleteProductById(id: number){
    this.productService.deleteProductById(id).subscribe(
      ()=> this.listProductService()
    );
  }

  editProductById(id: number){
    console.log({id});

    // this.productService.editProductById(product, id).subscribe(
    //   ()=> this.listProductService()
    // );
  }

}
