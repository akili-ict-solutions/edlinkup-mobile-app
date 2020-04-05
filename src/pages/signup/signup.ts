import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  ApiProvider } from '../../providers/api/api';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import {  ToastController } from 'ionic-angular';



/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	lname:any='';
	fname:any='';
	email:any='';
	password:any;
	password2:any;
	question:any='';
	answer:any='';
	passwordType: string = 'password';
    passwordIcon: string = 'eye-off';
   url=this.Api.ApiPath+'=register2&x1=';
   

	 
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,public http:Http, public Api:ApiProvider) {
	  
  }
  
  hideShowPassword(){
	 this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	
  }
  
  backtologin(){
	  this.navCtrl.push(LoginPage);
	  
  }
  
  
  keyUpCheckerfname(ev){
	 let elementChecker = ev.target.value;
     if(!isNaN(Number(elementChecker))){
	   this.fname='';
      }else{
		 this.fname=elementChecker; 
		  }
  }
  
  keyUpCheckerlname(ev){
	 let elementChecker = ev.target.value;
     if(!isNaN(Number(elementChecker))){
	   this.lname='';
      }else{
		 this.lname=elementChecker; 
		  }
  }
  
 onSignup(){
	 if(this.fname==""){
		this.presentToast("Enter your first name");	
		return false;
	}
	if(this.lname==""){
		this.presentToast("Enter your last name");	
		return false;
	}
	if(this.email==""){
		this.presentToast("Enter your phone number name");	
		return false;
	}
	
	if(this.password==""){
		this.presentToast("Create a password");	
		return false;
	}
	
	
	
	if(this.question==''){
		this.presentToast("Select security question");	
		return false;
	}
	
	
	if(this.answer==""){
		this.presentToast("Enter your answer");	
		return false;
	}
	
	
	
	
	
	console.log(this.url+this.fname+"&x2="+this.lname+"&x3=Male&x4="+this.email+"&x5="+this.password+"&x6="+this.question+"&x7="+this.answer);
	
	this.http.get(this.url+this.fname+"&x2="+this.lname+"&x3=&x4="+this.email+"&x5="+this.password+"&x6="+this.question+"&x7="+this.answer)
		.map(res => res.json())
        .subscribe(data =>
         {
		  console.log("Success");
         });
	      this.navCtrl.push(LoginPage);
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
    console.log('ionViewDidLoad SignupPage');
  }

}
