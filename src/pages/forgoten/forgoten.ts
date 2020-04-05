import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';
//ShowpasswordPage
/**
 * Generated class for the ForgotenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgoten',
  templateUrl: 'forgoten.html',
})
export class ForgotenPage {
    email:any='';
	question:any='';
	answer:any='';
	user:any="";
	url=this.Api.ApiPath+'=get_security_password&x1=';
    constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public Api:ApiProvider,public http:Http) {
    
 
    }

	showpassword(){
		console.log(this.url+this.email+"&x2="+this.question+"&x3="+this.answer);
		this.http.get(this.url+this.email+"&x2="+this.question+"&x3="+this.answer)
		.map(res => res.json())
        .subscribe(data =>
         {
		  console.log(data);
		  if(data.loginStatus==1){
	      
		  this.navCtrl.push(ChangepasswordPage,{data:'forgoten'});
	   
	   //this.onLogin(this.email,data.user.password);
	   
	   
		 }else{
			 
			 
		 }
         });
		 
	  
  }
	 backtologin(){
		 
		  this.navCtrl.push(LoginPage);
	 }
	
	public onLogin(x,y) {
	  
	  this.Api.AccessUrl(x,y).map(res => res.json())
          .subscribe(data => {
		   console.log(data);
		   if(data.loginStatus==1){
		 this.storage.set('phone',x);
		 this.storage.set('password',y);
		 this.user=data.user;
		 //this.access=data.access;
		 this.storage.set('user',data.user);
		 this.storage.set('access',data.access);
		 this.storage.set('iduser',this.user.idUser);  
	     this.storage.set('loginStatus',data.loginStatus);
		 console.log('save'); 
         this.storage.get('phone').then((val) => {
         console.log('Your age is', val);
         });		 
		 this.navCtrl.push(TabsPage);
		  //this.app.getRootNav().setRoot(TabsPage);
		   }
         });
	  
	  
	
		
		}
	

	
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotenPage');
  }

}
