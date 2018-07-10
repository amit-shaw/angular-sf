import { Pipe, PipeTransform } from '@angular/core';  
@Pipe({name: 'link'}) 

export class LinkFormat implements PipeTransform { 
    transform(value: string): string {
        if(value.length == 1){
          if(value.substring(0,4)){
            return 'https://www';
          }
        }else { 
          return value;
        //return 'XXX-XX-' + value.substr(0, value.length - 6);
        }
      }
} 