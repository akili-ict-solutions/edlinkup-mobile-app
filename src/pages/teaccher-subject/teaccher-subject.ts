import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {  ApiProvider } from '../../providers/api/api';


/**
 * Generated class for the TeaccherSubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-teaccher-subject',
    templateUrl: 'teaccher-subject.html',
})
export class TeaccherSubjectPage {
    title:any='';
    id:any=new Array();
    subjectmarks=new Array();
    segments:any='marks';
    imgaddlogo: string =this.Api.imgaddlogo;
    
    constructor(public navCtrl: NavController,public Api:ApiProvider,public http:Http, public navParams: NavParams) {
        this.title =navParams.get('title');
        this.id =navParams.get('id');
        console.log(this.id);
        this.subjectMarks(this.id.class, this.id.subject, this.id.term, this.id.exam);
    }
    subjectMarks(classid, subjectid, termid, examid) {
        this.Api.getSubjectMarks(classid, subjectid, termid, examid)
              .map(res=>res.json()).subscribe(data=>console.log(data));
    }
    userphoto(x) {
        if((x=='') || (x==null) || (x=='undefined')) {
            return 'images/noimage.jpg'; 
        }else{
            return x;  
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TeaccherSubjectPage');
    }
}
