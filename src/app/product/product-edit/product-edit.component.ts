import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { CreateProduct } from '../interfaces/createProduct.interface';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  title_edit: string = 'Formulario para edición de Producto';

  public id_pro: number=0;

   public productAfter: CreateProduct={
    product_name: '',
    categori:'',
    price: 0,
    cantidad_stock:0,
   }

   public newProduct: Product={
    id:0,
    product_name: '',
    categori:'',
    price: 0,
    cantidad_stock:0,
   }

  constructor(private productService: ProductService,
                private activeteRoute: ActivatedRoute,
                private router: Router
              )
    {}


  ngOnInit(): void {
    this.activeteRoute.params.pipe(
          switchMap(({id})=> this.productService.getProductById(id)),
        ).subscribe(product => {
          if(!product) return this.router.navigate(['home']);

          this.productAfter = product;
          this.id_pro = product.id;
          return;

        });
  }

  editProductByIdCom(id: number){
    const {product_name, price, categori, cantidad_stock } = this.productAfter;
    this.newProduct = {id, product_name, price, categori, cantidad_stock}

    this.productService.editProductById(this.newProduct, id)
      .subscribe((rest)=>{
        console.log(rest);
        if(!rest) return this.router.navigate([`add/product/${id}`]);

        return this.router.navigate(['home']);
      });
  }

}
