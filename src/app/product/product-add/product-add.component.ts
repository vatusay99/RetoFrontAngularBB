import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../interfaces/product.interface';
import { CreateProduct } from '../interfaces/createProduct.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

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

  public productForm: FormGroup = this.fb.group({
    product_name: ['',[Validators.required, Validators.minLength(3)]],
    categori:     ['',[Validators.required, Validators.minLength(3)]],
    price:        [0, [Validators.required, Validators.min(1)]],
    cantidad_stock: [0,[Validators.min(0)]]
  })


  constructor(private productService: ProductService,
              private activeteRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
            )
  {

  }

  ngOnInit(): void {

  }


  addproduct(){
    if(this.productForm.invalid) return;
    const { product_name, categori, price, cantidad_stock} = this.productForm.value;

    this.createProduct =  {product_name,categori, price, cantidad_stock}

    // this.product = {
    //   id:0,
    //   product_name: '',
    //   categori:'',
    //   price: 0,
    //   cantidad_stock:0,
    // };
    this.productService.postProduct(this.createProduct)
      .subscribe(
        rest=>{
          console.log(rest)
          this.router.navigate(['home']);
      });
  }

  isValidField(field: string): boolean | null{
    return this.productForm.controls[field].errors
      && this.productForm.controls[field].touched;
  }

  getFieldErrors(field: string, nameCampo: string): string | null {
    if(!this.productForm.controls[field]) return null;

    const errors = this.productForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {

      switch (key) {
        case 'required':
            return `Campo ${nameCampo} es requerido.`;
          break;
        case 'minlength':
            return `este campo debe tener minimi ${errors['minlength'].requiredLength} caracteres para ser valido.`;
          break;
        case 'min':
            return `Campo debe tener valores mayores a 1.`;
          break;
        default:
          break;
      }
    }

    return "";
  }

}
