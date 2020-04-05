import { Directive } from '@angular/core';

/**
 * Generated class for the CustomInformationDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[custom-information]' // Attribute selector
})
export class CustomInformationDirective {

  constructor() {
    console.log('Hello CustomInformationDirective Directive');
  }

}
