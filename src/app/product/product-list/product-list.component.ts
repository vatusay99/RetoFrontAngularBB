import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../service/product.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [{
    id: 1,
    product_name: 'carro',
    categori: 'Automovil',
    price: 4500000.00,
    cantidad_stock: 22
  },
  {
    id: 2,
    product_name: 'pelota',
    categori: 'jugueteria',
    price: 190000.00,
    cantidad_stock: 10
  },
  {
    id: 3,
    product_name: 'Consola Xbox',
    categori: 'Gamer',
    price: 1700000.00,
    cantidad_stock: 14
  },
  ];
  id: number = 0;
  titulo_products: string = "Listado de productos";

  constructor(private productService: ProductService){}


  ngOnInit(): void {
    this.listProductService();
  }

  listProductService(){
    this.productService.getProducts().subscribe(
      data => {
        console.log({data});
        // this.products = data;
        // console.log(this.products);
      }
    );
  }

  deleteProductById(id: number){
    this.productService.deleteProductById(id).subscribe(
      ()=> this.listProductService()
    );
  }

  editProductById(id: number){

    // this.productService.editProductById(product, id).subscribe(
    //   ()=> this.listProductService()
    // );
  }

}
