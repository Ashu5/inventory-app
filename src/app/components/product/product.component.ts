import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }
 public items:any[]=[];
 public imageSources:string='';
  public ngOnInit(): void {

    this.items.push({
      id:1,
      name:"A320",
      description:"Passenger Aircraft",
      unit:10
    },
    {
      id:2,
      name:"A380",
      description:"Passenger Aircraft",
      unit:13
    })

    this.getImageSources();
 
  }
  public getImageSources() {
    this.items.forEach((item:any)=>{
      this.imageSources=item.name;
    })
     switch(this.imageSources){
       case "A380":{
       this.imageSources= '../../../assets/A380.png';
       break;
       }
       case "A320":{
         this.imageSources= '../../../assets/A320.png';
         break;
         }
         default:{
           this.imageSources='../../../assets/AIRBUS_Blue.png'
         }
   
   
     }
  }


}
