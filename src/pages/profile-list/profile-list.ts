import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {  SchoolPage} from "../school/school";
import {  ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ProfileListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 **/

@Component({
  selector: 'page-profile-list',
  templateUrl: 'profile-list.html',
})
export class ProfileListPage {
  title:any;
  id:any;
  tasks:any;
  imgaddlogo: string = "http:\/\/edlinkup.co.tz\/";
  urltask = this.Api.ApiPath+'=education&x1=148&x2=';
	 
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public Api:ApiProvider) {
    this.title = navParams.get('title');
	this.id = navParams.get('id');
	console.log(this.urltask);
	console.log(this.id);
	this.gettask(this.id);
  }
    gettask(id){
	 this.http.get(this.urltask+id)
       .map(res => res.json())
       .subscribe(data => {
        this.tasks = data;
       });
   }
   openConnect(connect,id){
    console.log('The press:' + connect);
    this.navCtrl.push(SchoolPage,{title:connect,id:id});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileListPage');
  }

}
