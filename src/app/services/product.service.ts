import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
   }

   public getData():Observable<any>{
     return this.http.get(environment.baseURL+"getProducts");
   }

   public saveProduct(product:ProductModel):Observable<any>{
     return this.http.post(environment.baseURL+"addProduct",JSON.stringify(product),
     {
      headers:
        { 'Content-Type': 'application/json' }
    }); 
    }

    public updateProduct(id:string,product:ProductModel):Observable<any>{
      return this.http.put(environment.baseURL+"updateProduct/"+id,JSON.stringify(product),{
        headers:
          { 'Content-Type': 'application/json' }
      });
    }

    public deleteProduct(id:string):Observable<any>{
      return this.http.delete(environment.baseURL+"deleteProductById/"+id,{
        headers:
          { 'Content-Type': 'application/json' }
      });
    }
}
