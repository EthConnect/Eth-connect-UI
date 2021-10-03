import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyHex'
})
export class PrettyHexPipe implements PipeTransform {

  transform(hexString: string): string {
    if (hexString.length > 13) {
      let newStr = hexString.substr(0, 6);
      newStr += "...";
      newStr += hexString.substr(hexString.length - 4, 4)
      return newStr;
    }
    return hexString;
  }

}
