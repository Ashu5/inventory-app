import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

constructor(private productService:ProductService,private fb:FormBuilder) { }
 public products:ProductModel[]=[];
 public imageSources:string[]=[];
 public categories:string[]=['Commercial','Space','Helicopter'];
 public filterdProducts:ProductModel[]=[];
 public formGroup:FormGroup;

 public ngOnInit(): void {
 this.getInitData();
 this.initForm();
  }

  public initForm():void{
    this.formGroup=this.fb.group({
      category:'-1'
    })
  }

  public getInitData() {
    this.productService.getData().subscribe((res:ProductModel[])=>{
      this.products=res;
      this.filterdProducts=[...this.products];
      this.getImageSources(this.products);
    })
  }


  public getImageSources(items:ProductModel[]) {
    this.imageSources=[];
    items.forEach((item:any)=>{
      switch(item.productName){
        case "A380":{
        this.imageSources.push('../../../assets/A380.png');
        break;
        }
        case "A320":{
          this.imageSources.push('../../../assets/A320.png');
          break;
          }
          case "H125":{
           this.imageSources.push('../../../assets/H125.png');
           break;
           }
           case "Sentinel":{
            this.imageSources.push('../../../assets/Sentinel.png');
            break;
            }
          default:{
            this.imageSources.push('../../../assets/AIRBUS_Black.png');
          }
      }
    })
  }

  public onSelectionChange(event:any){
    const selectedItem:string=event.target.value;
    this.filterdProducts= this.products.filter(
      (items: ProductModel): any => {
       return items.category===selectedItem;
      }
    );
    this.getImageSources(this.filterdProducts);
  }

  public onClear():void{
    this.filterdProducts=[...this.products];
    this.getImageSources(this.filterdProducts);
    this.formGroup.reset();
  }

}
