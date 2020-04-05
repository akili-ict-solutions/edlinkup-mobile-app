import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
import { SchoolPage } from "../school/school";
import { ManagePage } from "../manage/manage";
import { ApiProvider } from '../../providers/api/api';

@Component({
	selector: 'page-student',
	templateUrl: 'student.html'
})

export class StudentPage {
	title:any;
	id:any;
	Timetable:any='';
	Attendance:any='';
	tasks:any='';
	Profile:any='';
	darasa:any='';
	School:any='';
	Reports:any='';
	Gallery:any='';
	Subjects:any='';
	Diary:any='';
	idMember:any;
	Fee: {required?: string, payment?: string} = {};
	Documents:any='';
	Data:any='';
	std:any='';
	stream:any='';
	classid:any='';
	Schoolid:any='';
	details:any='';
	studentdetail:any='';
	privelege:any='';
	Timeline:any='';
	//imgaddlogo: string = "http:\/\/192.168.10.2\/stankonya2\/";
	//imgadd: string = "http:\/\/192.168.10.2\/stankonya2\/images\/post\/";
	//urltask = 'http://192.168.10.2/stankonya2/classes/dataHandler.php?x=studentReport&x1=';
	imgadd: string =this.Api.imgadd;
	imgaddlogo: string =this.Api.imgaddlogo;
	urltask=this.Api.ApiPath+'=studentReport&x1=';
	attandance: any=[];
	Attandance: any=[];
	attandanced: any='';
	classtream: string;
	classname: string;
	year: string;
	stdid: string;

  	constructor(public navCtrl: NavController, public https: HttpClient, public navParams: NavParams, public Api:ApiProvider, public http: Http) {
		this.title = navParams.get('title');
		this.id = navParams.get('id');
		this.details = navParams.get('details');
		this.privelege = navParams.get('privelege');
		this.idMember = navParams.get('idMember');
		this.getProfile(this.id);
		this.getData(this.id);
		this.getExamList();
  	}

	getProfile(id) {
        this.http.get(this.urltask+id+"&x2="+2018).map(res => res.json())
			.subscribe(data => {
				this.std=data.id;
				this.stream=data.streamid;
				this.classid=data.classid;
				this.Profile = data;
				this.studentdetail= data.profile;
				this.Profile.darasa=this.studentdetail.darasa;
				this.Profile.stream=this.studentdetail.stream;
				this.School= data.schoolprofile.Profile;
				this.Schoolid=this.School.id;
				this.details.profile=this.School.name;
				this.details.profilephoto=this.School.logo;
				this.Timetable=data.timetable;
				this.Attendance=data.attandanced;
				this.Reports=data.report;
				this.Fee.required=data.requiredpayment;
				this.Fee.payment=data.payment;
				this.Subjects=data.subjects;
				this.Diary=data.diary;
				this.Data=data;
				// console.log(this.School);
			});
    }
	
	clearstatus(x,y) {
		if(x=='report_status') {
			this.studentdetail.report_status=0;	
			this.http.get(this.Api.ApiPath+'=clearstatus&x1=report&x2='+y).map(res => res.json())
				.subscribe(data => {
					// console.log(data);
				});
		}
		if(x=='homework_status') {
			this.studentdetail.homework_status=0;
			this.http.get(this.Api.ApiPath+'=clearstatus&x1=homework&x2='+y).map(res => res.json())
       			.subscribe(data => {
		   			// console.log(data);
				});		
		}
		if(x=='diary_status'){
			this.studentdetail.diary_status=0;
        	this.http.get(this.Api.ApiPath+'=clearstatus&x1=diary&x2='+y).map(res => res.json())
       			.subscribe(data => {
		   			// console.log(data);
				});		
		}
		/*	
		this.http.get(this.Api.ApiPath+'=clearstatus&x1='+x+'&x2='+y).map(res => res.json())
			.subscribe(data => {
				console.log(data);
			});
		*/
	}
	
	getData(id) {
		this.attandance=this.https.get(this.urltask+id).subscribe(data => {
			this.attandanced=data;
		});
	}
	
	getExamList() {
		/*console.log(this.attandanced);
		this.stdid=this.attandanced.profile.id;
		this.year=this.attandanced.report.year;
		this.classname=this.attandanced.profile.classid;
		this.classtream=this.attandanced.profile.streamid;
		this.https.get(this.Api.ApiPath+'=getStudentExamlist&x1='+this.stdid+'&x2='+this.year+'&x3='+this.classname+'&x4='+this.stream).subscribe(data => {
			console.log(data);
			// this.examlist=data;
		});*/
	}

	openManager(name, id, connect) {
		if(this.privelege=='teacher') {
			if(connect=="Reports") {
				return false;
			}
			if(connect=="Fee") {
				return false;
			}
			this.navCtrl.push(ManagePage, { title:connect, idProfile:id, name:name, id:id, idMember:this.idMember, data:this.Data, studentid:this.id, position:this.privelege, attandanced:this.attandanced, schoolProfile:this.School });
		} else {
			this.navCtrl.push(ManagePage, { title:connect, idProfile:id, name:name, id:id, idMember:this.idMember, data:this.Data, studentid:this.id, position:this.privelege, attandanced:this.attandanced, schoolProfile:this.School });  
		}
	}

	getSchool(school) {
		this.http.get(this.Api.ApiPath+'=Myupdates&x1=2&x2='+this.idMember).map(res => res.json())
       		.subscribe(data => {
				this.Timeline=data;
			});
    }
	
	openTimeline(connect, id) {
		// console.log('The press:' + connect + ' id = ' + id);
		this.navCtrl.push(SchoolPage, { title:connect, id:this.Schoolid });
	}

	userphoto(x){
		if(( x=='') || (x==null)) {
			return 'images/noimage.jpg'; 
		}else{
			return x;  
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Student Page');
	}
}
