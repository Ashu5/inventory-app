import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule }   from '@angular/forms';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './shared/logout/logout.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    ProductManagerComponent,
    NavbarComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
