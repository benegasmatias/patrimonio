import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    console.log(arg)
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.name_element.indexOf(arg) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }


}