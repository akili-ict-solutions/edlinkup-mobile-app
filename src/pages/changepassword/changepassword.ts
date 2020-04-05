import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {  ToastController } from 'ionic-angular';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
   password0:any='';
   password1:any='';
   password2:any='';
   data:any='';
  url=this.Api.ApiPath+'=change_password&x1=';
    constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public Api:ApiProvider,public http:Http) {
    this.data = navParams.get('data');
	console.log(this.data);
	
    }
	
	showpassword(){
		
		if(this.password1!=this.password2){
			this.presentToast("Password does not match");	
		    return false;	
			}
		
		
		this.storage.get('user').then((val) => {
			
			if(val.password==this.password0){
			console.log(val.idUser);	
			this.http.get(this.url+val.idUser+"&x2="+this.password1)
		    .map(res => res.json())
            .subscribe(data =>
            {
			 console.log(data);
			 this.presentToast("Success");
	         this.navCtrl.push(TabsPage);
		 
             });	
			}else{
				
				
			}
       /* this.http.get(this.url+this.val+"&x2="+this.password1)
		.map(res => res.json())
        .subscribe(data =>
         {
			 console.log(data);
	      this.navCtrl.push(TabsPage);
		 
         });
		 */
  });
		
		
  }
  
  
	
	changepassword(){
		
		if(this.password1!=this.password2){
			this.presentToast("Password does not match");	
		    return false;	
			}
		
		
		this.storage.get('user').then((val) => {
				
			this.http.get(this.url+val.idUser+"&x2="+this.password1)
		    .map(res => res.json())
            .subscribe(data =>
            {
			this.presentToast("Success");
	         this.navCtrl.push(TabsPage);
		 
             });
  });
		
		
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
	cssClass: "yourCssClassName",
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }
	
	
	
	
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
