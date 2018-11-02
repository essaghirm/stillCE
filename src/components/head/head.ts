import { Component, Input } from '@angular/core';

/**
 * Generated class for the HeadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'head-app',
  templateUrl: 'head.html'
})
export class HeadComponent {
  @Input() page: string;
  text: string;

  constructor() {
    console.log('pageName', this.page);
    this.text = 'Hello World HeadComponent';
  }

}
