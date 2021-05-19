import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule }   from '@angular/forms';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { AuthIntercepterService } from './services/auth-intercepter.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    ProductManagerComponent,
    NavbarComponent,
    RegisterComponent,
    LogoutComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthIntercepterService,
    multi   : true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
