import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';

const routes: Routes = [
  {path:'home', component: ProductListComponent},
  {path:'add/product', component: ProductAddComponent},
  {path:'add/product/:id}', component: ProductAddComponent},
  {path:'**', redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
