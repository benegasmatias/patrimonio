import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  @Input() model: { type: string, id: number, columns };
  @Input() list: any[];

  public isArray(object): boolean {
    return Array.isArray(object);
  }

  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }

}
