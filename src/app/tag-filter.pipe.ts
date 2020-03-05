import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagFilter',
  pure: false
})
export class TagFilterPipe implements PipeTransform {

  transform(items: any[], args: any[]): any {
    if(!items) return [];
    if(!args) return items;
    if(!args.length) return items;
    
    let list = []
    items.forEach((item) => {
      let common = item['tags'].filter((e) => {
        return args.indexOf(e) > -1;
      })
      if(common.length) {
        list.push(item)
      }
    })
    return list;
  }

}
