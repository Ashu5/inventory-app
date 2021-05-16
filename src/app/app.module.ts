import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { UniqueCategoryPipe } from './pipes/unique-category-pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule }   from '@angular/forms';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { fakeBackendProvider } from './services/fake-backend.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ProductComponent,
    UniqueCategoryPipe,
    ProductManagerComponent,
    NavbarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
