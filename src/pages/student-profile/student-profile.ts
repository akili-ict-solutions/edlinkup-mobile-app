import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


/*
  Generated class for the ProfileList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-profile',
  templateUrl: 'student-profile.html'
})
export class studentprofilePage {

  title:any;
  id:any;
  tasks:any;
  Profile:any;
  imgaddlogo: string = "http:\/\/edlinkup.co.tz\/";
  
  urltask=this.Api.ApiPath+'=studentReport&x1=';
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public Api:ApiProvider) {
    //this.Profile = navParams.get('title');
	this.Profile= navParams.get('id');
	//console.log(this.urltask);
	console.log("ok ok");
	//this.gettask(this.id);
  }
    gettask(id){
		
		 this.http.get(this.urltask+id)
       .map(res => res.json())
       .subscribe(data => {
		console.log(data); 
       
		//this.title ='Profile';
        this.Profile = data.profile;
	     //this.member=this.Profile.parentdetail;
		//this.name =connect;
		});
		
		
	/* this.http.get(this.urltask+id)
       .map(res => res.json())
       .subscribe(data => {
        this.tasks = data.subTasks;
       });
	   */
   }
   
   userphoto(x){
	  
	  if((x=='')||(x==null)){
		  
		 return 'images/noimage.jpg'; 
	  }else{
		  
		  
		return x;  
	  }
	  
  }
  
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileListPage');
  }

}
