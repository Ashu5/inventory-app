import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    canActivate: [AuthGuardService] 
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
  canActivate: [AuthGuardService] ,
  component:ProductManagerComponent
},
{ path: 'register', 
component: RegisterComponent 
},
{ path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
