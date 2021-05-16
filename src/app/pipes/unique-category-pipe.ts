import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:"UniquePipe"})

    export class UniqueCategoryPipe implements PipeTransform{

        transform(items: any[], ...args: any[]) {
            let uniqueArray = items.filter(function (el, index, array) { 
                return array.indexOf (el) == index;
              });
              return uniqueArray; 
        }
        
    }