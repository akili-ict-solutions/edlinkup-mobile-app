import { Component } from '@angular/core';

/**
 * Generated class for the CustomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'custom',
    templateUrl: 'custom.html'
})
export class CustomComponent {

    text: string;

    constructor() {
        console.log('Hello CustomComponent Component');
        this.text = 'Hello World';
    }

}
