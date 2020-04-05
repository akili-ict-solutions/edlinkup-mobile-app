import { Component } from '@angular/core';
import { ViewController, NavParams  } from 'ionic-angular';


@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html'
})
export class EditModalPage {
	postEdit:any='';
	
	
  constructor(public viewCtrl: ViewController,
			   public navParams: NavParams ) {
	  this.postEdit = navParams.get('post');
	  console.log(this.postEdit);
	  
  }
adjustTextarea(event: any): void {
	let textarea: any		= event.target;
	textarea.style.overflow = 'hidden';
	textarea.style.height 	= 'auto';
	textarea.style.height 	= textarea.scrollHeight + 'px';
	return;
}
  closeModal(x) {
	  let data={'post':this.postEdit,'role':x};
	  
      this.viewCtrl.dismiss(data);
  }
}