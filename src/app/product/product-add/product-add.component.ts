import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../interfaces/product.interface';
import { CreateProduct } from '../interfaces/createProduct.interface';
import { EventEmitter } from 'stream';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private productService: ProductService, private activeteRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.activeteRoute.params.subscribe((params: any) =>{
      if(params.list){
        console.log('Sin Id');
      }
      console.log({params: params});
      console.log({id: params['id']});

    });

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

  returnBtnName(name: string): void{

    console.log('CREAR');
    console.log({name});


  }

  editProductById(id: number){
    console.log({id});


    // this.productService.editProductById(id).subscribe(
    //   ()=> this.listProductService()
    // );
  }

}
