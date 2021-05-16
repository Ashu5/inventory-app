import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
},
{
  path:'products',
  component:ProductComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'admin',
  component:ProductManagerComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
