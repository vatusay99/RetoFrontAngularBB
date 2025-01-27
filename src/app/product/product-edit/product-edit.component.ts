import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { CreateProduct } from '../interfaces/createProduct.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  title_edit: string = 'Formulario para edición de Producto';

  public id_pro: number=0;

  public editForm: FormGroup = this.fb.group({
    id: [,[Validators.required]],
    product_name:['', [Validators.required, Validators.minLength(3)]],
    categori:['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
    cantidad_stock: [0, [Validators.min(1)]]
  });

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
                private router: Router,
                private fb: FormBuilder
              )
    {}


  ngOnInit(): void {
    this.activeteRoute.params.pipe(
          switchMap(({id})=> this.productService.getProductById(id)),
        ).subscribe(product => {
          console.log({product});

          if(!product) return this.router.navigate(['home']);
          this.editForm.setValue(product);
          return;

        });
  }

  editProductByIdCom(id: number){
    if(this.editForm.invalid) return;

    this.newProduct = this.editForm.value;

    this.productService.editProductById(this.newProduct, this.editForm.value.id)
      .subscribe((rest)=>{
        // console.log(rest);
        if(!rest) return this.router.navigate([`add/product/${id}`]);

        return this.router.navigate(['home']);
      });
  }



  isValidField(field: string): boolean | null{
    return this.editForm.controls[field].errors
      && this.editForm.controls[field].touched;
  }

  getFieldErrors(field: string, nameCampo: string): string | null {
    if(!this.editForm.controls[field]) return null;

    const errors = this.editForm.controls[field].errors || {};
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
