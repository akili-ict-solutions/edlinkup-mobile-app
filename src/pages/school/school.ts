import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TimelinePage } from "../timeline/timeline";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-school',
  templateUrl: 'school.html',
})
export class SchoolPage {
  title:any;
  id:any;
  profileid:any;
  tasks:any='';
  photo:any='';
  name:any='';
  location:any='';
  logo:any='';
  Profile:any='';
  Profile_ :any='';
  imgadd: string =this.Api.imgadd;
  imgaddlogo: string =this.Api.imgaddlogo;
    constructor(public navCtrl: NavController, public navParams: NavParams,public Api:ApiProvider,public http:Http) {
    this.title = navParams.get('title');
    this.id = navParams.get('id');
    this.Api.gettask(this.id).map(res => res.json())
        .subscribe(data => {
            this.Profile = data;
            this.Profile_ = data.Profile;
        });
    this.Api.getProfile(this.id)
        .map(res => res.json())
        .subscribe(data => {
            this.Profile = data;
            this.Profile_ = data.Profile;
            this.photo=this.Profile_.photo;
            this.name=this.Profile_.name;
            this.profileid=this.Profile_.id;
            this.location=this.Profile_.location;
            this.logo=this.Profile_.logo;
            console.log(this.Profile);
        });

    }
    openTimeline(connect, id) {
        this.navCtrl.push(TimelinePage, { title:connect, id:id, profile:this.Profile_ });
    }
    userphoto(x) {
        if((x=='') || (x==null)) {
            return 'images/noimage.jpg'; 
        } else  {
            return x;  
        }
    }
}
