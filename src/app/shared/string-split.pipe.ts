import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSplit'
})
export class StringSplitPipe implements PipeTransform {
  transform(inputString: string, substring?: string): string[] {

      if(substring){
        return inputString.split(substring);
      }
      else{
        return inputString.split(" ");
      }
    }
}
