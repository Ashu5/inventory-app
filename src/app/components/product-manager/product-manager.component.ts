import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
public user:string;
public categories:string[]=['Commercial','Space','Helicopter'];
public productFormGroup:FormGroup;
public formMode:string='MODIFY';
public category$:Observable<string>;
public productData!:ProductModel;
public columnDefs!:ColDef[];
public rowData!:ProductModel[];
public isEditable:boolean=false;
public gridApi!:any;
public selectedData!:ProductModel;
  constructor(
    private fb:FormBuilder,
    private productService:ProductService
    
    ) { }

public ngOnInit(): void {
 this.user=JSON.parse(localStorage.getItem('user'));
 this.initForms();
 this.getData();
 this.columnDefs = [
  { headerName:"ID", field: 'id'},
  { headerName:"Name", field: 'productName'},
  { headerName: 'Category',field:'category'},
  { headerName: 'Description',field:'description'},
  { headerName: 'Unit',field:'unit'},

];

  }

 public initForms():void {
    this.productFormGroup=this.fb.group({
      name:'',
      category:[],
      description:'',
      units:''
    })
  }

  public getData():void{
    if (!this.formMode || this.formMode === 'ADD') {
      return;
    }
    this.productService.getData().subscribe((response:ProductModel[])=>{
    response.forEach((item:ProductModel)=>{
      this.productData=item;
    })
    this.rowData=response;
    //this.updateFormValues();
    })
  }


  public updateFormValues(item:ProductModel):void{
   this.productFormGroup.patchValue({
     name:item.productName,
     category:item.category,
     description:item.description,
     units:item.unit
   })
  }

  public onSubmit() {
  
   console.log(this.productFormGroup)
  }

  public onClear():void{
    this.formMode='ADD';
    this.isEditable=!this.isEditable;
    this.productFormGroup.reset();
  }

  public onDoubleClick():void{
    this.formMode='MODIFY';
    this.isEditable=!this.isEditable;
   this.selectedData=this.gridApi.getSelectedRows()[0];
   this.updateFormValues(this.selectedData);
  }
  
  public onGridReady(params) {
    this.gridApi = params.api;
  }
}
