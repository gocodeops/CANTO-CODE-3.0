import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the MycomponentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'mycomponent',
  templateUrl: 'mycomponent.html'
})
export class MycomponentComponent {

  @Input('myText') textToUse;
  @Output() somethingHappened = new EventEmitter();

  text: string;

  constructor() {
    console.log('Hello MycomponentComponent Component');
    this.text = 'Hello Universe';
  }

  ngAfterViewInit(){
    this.text = this.textToUse;

    let interval = setInterval(() => {
      this.somethingHappened.emit("its time");
    }, 3000);

  }

}
