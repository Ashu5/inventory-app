import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProductModel } from 'src/app/models/product.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductService } from 'src/app/services/product.service';
export const ADMIN_TITLE:string="Admin Panel";
@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss'],
})

export class ProductManagerComponent implements OnInit {
  public user: string;
  public categories: string[] = ['Commercial', 'Space', 'Helicopter'];
  public productFormGroup: FormGroup;
  public formMode: string = 'ADD';
  public category$: Observable<string>;
  public productData!: ProductModel;
  public columnDefs!: ColDef[];
  public rowData!: ProductModel[];
  public isEditable: boolean = false;
  public gridApi!: any;
  public selectedData!: ProductModel;
  public productId!: string;
  public submitted:boolean = false;
  get getFormControls() {
    return this.productFormGroup.controls;
  }
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogService:DialogService
  ) {}

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.initForms();
    this.getData();
    this.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Name', field: 'productName' },
      { headerName: 'Category', field: 'category' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Unit', field: 'unit' },
    ];
  }

  public initForms(): void {
    this.productFormGroup = this.fb.group({
      productName:  ['', Validators.required],
      category: ['', Validators.required],
      description:  ['', Validators.required],
      unit:  ['', Validators.required],
    });
  }

  public getData(): void {
    this.productService.getData().subscribe((response: ProductModel[]) => {
      response.forEach((item: ProductModel) => {
        this.productData = item;
      });
      this.rowData = response;

    });
  }

  public updateFormValues(item: ProductModel): void {
    this.productFormGroup.patchValue({
      productName: item.productName,
      category: item.category,
      description: item.description,
      unit: item.unit,
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.productFormGroup.invalid) {
      return;
    } 
    if (this.formMode === 'ADD') {
      this.saveData();
    } else {
      this.updateExistingProduct(this.productFormGroup.value);
    }
    this.onClear();
  }

  public saveData(): void {
    this.productService
      .saveProduct(this.productFormGroup.value)
      .pipe(first())
      .subscribe((response: ProductModel) => {
        if (response !== null) {
          this.showDialog("Product Added SuccessFully");
        } else {
          this.showDialog("Product Not Added");
        }
      });
      this.onClear();
  }

  public updateExistingProduct(product: ProductModel): void {
    this.productService
      .updateProduct(this.productId, product)
      .pipe(first())
      .subscribe((response: ProductModel): void => {
        if (response !== null) {
          this.showDialog("Product Updated");
        } else {
          this.showDialog("Product Not Updated");
        }
      });
  }

  public onClear(): void {
    this.formMode = 'ADD';
    if(!this.productFormGroup.invalid){
      this.isEditable = !this.isEditable;
    }
    this.productFormGroup.reset();
  }

  public onDoubleClick(): void {
    this.formMode = 'MODIFY';
    this.isEditable = !this.isEditable;
    this.selectedData = this.gridApi.getSelectedRows()[0];
    this.productId = this.selectedData.id;
    this.updateFormValues(this.selectedData);
  }

  public onGridReady(params) {
    this.gridApi = params.api;
  }

  public onRefresh(): void {
    this.getData();
  }

  public removeRow(): void {
    let focusedNode = this.gridApi.getSelectedRows()[0];
    if(focusedNode==null){
      this.showDialog("Select a row to delete");
    }
    let newRowData = this.rowData.filter((row) => {
      return row !== focusedNode;
    });
    this.deleteSelectedRow(focusedNode.id);
    this.rowData = newRowData;
  }

  public deleteSelectedRow(id: string): void {
    this.productService
      .deleteProduct(id)
      .pipe(first())
      .subscribe(
        (response: any): void => {
          if (response === null) {
            this.showDialog("Deleted Row:"+id);
          }
        },
        (error) => {
          this.showDialog("Error Occured");
        }
      );
  }

  public showDialog(message:string):void{
    this.dialogService.openDialog(ADMIN_TITLE,message);
  }
}
