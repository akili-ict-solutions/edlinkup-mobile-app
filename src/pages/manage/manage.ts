import { Component } from '@angular/core';
import { AlertController, ActionSheetController, LoadingController, ModalController, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { CallAttendPage } from "../call-attend/call-attend";
import { CommentsPage } from "../comments/comments";
import { ExamPage } from "../exam/exam";
import { EditModalPage } from "../edit-modal/edit-modal";
import { StudentPage } from "../student/student";
import { TeaccherSubjectPage } from "../teaccher-subject/teaccher-subject";

@Component({
	selector: 'page-manager',
	templateUrl: 'manage.html'
})

export class ManagePage {
	imageURI:any='';
    imageFileName:boolean = false;

    Domain="edlinkup.co.tz";
    img_pdf:any="https:\/\/"+this.Domain+"\/images\/pdf\.png";

	segments:any='Mon';
	segments_teacher:any='students';
	Teacher_Timetable:any;
	Teacher_Subject:any;
	Feepanel:any='Account';
	title:any;
	id:any;
	post:any;
	classesList:any='';
	subjectId:any='';
	classId:any='';
	streamId:any='';
	imgupload:any='';
	studentid:any='';
	getdiary:any='';
	getTdiary:any='';

	Staff:any='';
	teacherdiary:any;
	news:any='';
	className:any='';
	streamName:any='';
	subjectName:any='';
	ExamName:any=new Array();
	TermName:any=new Array();
	classexamlist=new Array();

	studentProfile:any='';
	idSchool:any='';
	name:any;
	marks:any=new Array();
	marks2:any=new Array();
	marksid:any=new Array();
	Data:any='';
	Timetable:any='';
	myDate:any=new Date();
	tasks:any='';
	Profile:any='';
	School:any='';
	Reports:any='';
	Gallery:any='';
	Subjects:any='';
	Diary:any='';
	diary:any=new Date();
	Fee:any='';
	classinfo='';
	stream='';
	member:any;
	Payment:any='';
	Required:any='';
	Documents:any='';
	terms:any='';
	Messages:any='';
	idProfile:any='';
	idMember:any='';
	exams:any='';
	position:any='';
	exam=0;
	term=0;
	classesreport:any='';
	NoticeBoard:any='';
	data:any='';
	panel:any='news';
	urltask=this.Api.ApiPath+'=studentReport&x1=';
	urlteacherTimetable:any='';
	imgadd: string =this.Api.imgadd;
	imgaddlogo: string =this.Api.imgaddlogo;
	Attandance:any=[];
	attandanced=new Array();
	notification: any;
	MessageStatus: string;
	year: any;
	classname: any;
	comments: any;
	examlist: any;
	schoolProfile: any;

    indx:any='';
    idstudent:any='';

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController,
		    public http:Http, public Api:ApiProvider, public https: HttpClient, public storage: Storage, public platform: Platform,
			    private documentViewer: DocumentViewer, private file: File, private fileOpener: FileOpener, private transfer: FileTransfer, private camera: Camera) {

		this.title = navParams.get('title');
		this.idProfile=navParams.get('idProfile');
		this.idSchool=navParams.get('idProfile');
		this.name = navParams.get('name');
		this.id = navParams.get('id');
		this.idMember=navParams.get('idMember');
		this.Data = navParams.get('data');
		this.studentid =navParams.get('studentid');
		this.position=navParams.get('position');
		this.attandanced=navParams.get('attandanced');
		this.schoolProfile=navParams.get('schoolProfile');

		if (this.title == 'Post_Result') {
			this.idProfile = this.id.idSchool;

			// console.log(this.id);

			this.TeacherSubject(this.id.class, this.id.stream, this.id.subjectid, this.id.cls, this.id.str, this.id.sbj);
		}

		if (this.title == 'My_Student') {
			this.idProfile = this.id.idSchool;

			// console.log(this.id);

			this.TeacherSubject(this.id.class, this.id.stream, this.id.subjectid, this.id.cls, this.id.str, this.id.sbj);
		}

		if (this.title == 'ClassTeacher') {
			this.myclasses(this.idMember, this.idSchool);
		}

		if (this.title == 'Timetable') {
			this.Timetable=this.id;
		}

		if (this.title == 'Attendance') {
			// console.log(this.id);

            this.Attandance=this.attandanced;
		}

		if (this.title == 'Messages') {
			this.Messages=this.attandanced;
		}

		if (this.title == 'Reports') {
			// console.log(this.id);

            this.gettermexam(this.id[0].idSchool);

            this.Reports=this.id;
		}

		if (this.title == 'Diary') {
			this.getstudentdiary('diary');

            this.panel='diary';
		}

		if (this.title == 'diary') {
			this.TeacherSubject(this.id.class, this.id.stream, this.id.subjectid, this.id.cls, this.id.str, this.id.sbj);

            this.teachersubjectdiary('diary');

            this.panel='diary';
		}

		if (this.title == 'Homeworks') {
			this.getstudentdiary('homework');

            this.panel='homework';
		}

		if (this.title == 'homework') {
			this.teachersubjectdiary('homework');

            this.TeacherSubject(this.id.class, this.id.stream, this.id.subjectid, this.id.cls, this.id.str, this.id.sbj);
		}

		if (this.title == 'Fee') {
			this.Required=this.id.required;

            this.Payment=this.id.payment;
		}

		if (this.title == 'Subjects') {
			this.Subjects=this.id;
		}

		if (this.title == 'Gallery') {

		}

		if (this.title == 'NoticeBoard') {
			this.getSchool(this.idSchool);
		}

		if (this.title == 'Staff') {
			this.getStaff(this.idSchool);
		}

		if (this.title == 'Duties') {
			this.getStaff(this.idSchool);
		}

		if (this.title == 'School_Timetable') {
			this.Timetable=this.id;
		}

		if (this.title == 'Events') {
			this.Timetable=this.id;
		}

		if (this.title == 'School_Events') {
			this.Timetable=this.id;
		}

		if (this.title == 'Jobs') {
			this.Timetable=this.id;
		}

		if (this.title == 'Teacher_Timetable') {
			this.TeacherTimetable(this.idProfile, this.idMember);
		}

		if (this.title == 'Teacher_Result') {
			this.getteacherReport(this.idMember);
		}

		if (this.title == 'Profile') {
			this.Profile=this.id.profile;

            this.member=this.Profile.parentdetail;

            // this.navCtrl.push(studentprofilePage,{data:this.Profile});
		}

		if (this.title == 'Documents') {
			this.panel='resource';

            this.getstudentdiary('resource');
		}

		if (this.title == 'resource') {
			this.teachersubjectdiary('resource');

            this.TeacherSubject(this.id.class, this.id.stream, this.id.subjectid, this.id.cls, this.id.str, this.id.sbj);
		}

		if (this.title == 'Classes_Report') {
			this.getteacherReport(this.idMember);
		}

		this.TeacherSubjectManage();
	}

	gettermexam(id) {
		this.Api.get_termexam(id).map(res => res.json())
			.subscribe(data => {
				this.classesreport=data;
			});
	}

	posts(x) {

		this.title='Student_Message'
		this.comments=x;
	     }
	getteacherReport(id) {
		this.Api.get_teacherReport(id).map(res => res.json())
			.subscribe(data => {
				this.classesreport=data;
			});
	}
	Classes_Report(connect, id) {
		this.navCtrl.push(TeaccherSubjectPage, { title:connect, id:id });
	}


  uploadFile(y) {
 // let loader = this.loadingCtrl.create({
 //   content: "Uploading..."
 // });
 // loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let options = {
    fileKey: 'image',
    fileName: 'image.jpg',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }
 for(let i=0; i<this.Teacher_Subject.length; i++){
		 this.marksid[i]=this.Teacher_Subject[i].id;
		}
		let link =this.Api.ApiPath+"=study&x1="+this.idProfile+"&x3="+y+"&x2=&x4="+this.idMember+"&x5=&x6=";

		//let headers = new Headers({ 'Content-Type': 'multipart/form-data' });


  fileTransfer.upload(this.imageURI,link, options)
    .then((data) => {
    console.log(data+" Uploaded Successfully");
	this.presentToast("Image uploaded successfully");
    //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    //loader.dismiss();
    this.presentToast("Image uploaded successfully");
  }, (err) => {
    console.log(err);
    //loader.dismiss();
    this.presentToast(err);
  });
}

  presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

	myclasses (id, school) {
		// let link = "https://edlinkup.co.tz/classes/dataHandler.php?x=myClassAttendance&x1=1118&x2=2";

		let link = this.Api.ApiPath+"=myClassAttendance&x1="+id+"&x2="+school;

		this.http.get(link).map(res => res.json()).subscribe(data => {
			console.log(data);

			this.classesList = data;
		});
	}

	callAttendance (x) {
		console.log(x);

		this.Api.getTeacherSubjects(x.idSchool, x.classid, x.streamid).map(res => res.json()).subscribe(data => {
			console.log(data);

			this.navCtrl.push(CallAttendPage, { student: data.students, classid: x.classid, idschool: x.idSchool, stream: x.streamid });
		});
	}

	viewStudent (connect, id, details) {
		// this.navCtrl.push(studentprofilePage, { id: this.Profile });

		this.http.get(this.urltask+id).map(res => res.json()).subscribe(data => {
			console.log(data);

			// this.title = 'Profile';
			// this.Profile = data.profile;

			this.navCtrl.push(StudentPage, { title: connect, id: id, privelege: 'teacher', idMember: this.idMember, details: details });

			// this.navCtrl.push(StudentPage, { id: data.profile });
			// this.member = this.Profile.parentdetail;
			// this.name = connect;
		});
	}


	  getSchool(school){
	  this.Api.getSchoolProfile(school).map(res => res.json())
       .subscribe(data => {
		 this.NoticeBoard=data.Notice;
		});

    }

	getStaff(school){
	  this.Api.getMembers(school).map(res => res.json())
       .subscribe(data => {
		   console.log(data);
		 this.Staff=data;
		});

    }


  TeacherTimetable(id,school){
	  this.Api.getTeacherTimetable(id,school)
       .map(res => res.json())
       .subscribe(data => {
		 console.log(data.timetable);
		 this.Teacher_Timetable=data.timetable;
		});

    }

	TeacherSubjectManage(){
        this.Api.getUpdates(0,10,this.panel,2).map(res => res.json())
        	.subscribe(data => {
        		this.data = data;
				this.news=this.data.updates;
				//console.log(this.panel);
       		});
        setTimeout(() => {
            // console.log('Async operation has ended');
        }, 2000);
	}

	adjustTextarea(event: any): void {
		let textarea: any		= event.target;

		textarea.style.overflow = 'hidden';
		textarea.style.height 	= 'auto';
		textarea.style.height 	= textarea.scrollHeight + 'px';

		return;
	}


	TeacherSubject (classId, streamId, subjectId, className, streamName, subjectName) {
		this.className=className;
		this.streamName=streamName;
		this.subjectName=subjectName;

		this.classId=classId;
		this.streamId=streamId;
		this.subjectId=subjectId;

		let schoolID = this.idProfile;

		// let link = "http://edlinkup.co.tz/classes/dataHandler.php?x=getstudentlist&x1=2018&x2=18&x3=13&x4=1&x5=1&x6=2";

		this.Api.getTeacherSubjects(schoolID, classId, streamId).map(res => res.json()).subscribe(data => {
			console.log(data);

			this.classinfo = data.classinfo;

			// console.log(this.classinfo);

			this.stream = data.stream;

			// console.log(this.stream);

			// this.studentInfo = data.studentsProfile;

			// console.log(this.studentInfo);

			this.Teacher_Subject = data.students;

			// console.log(this.Teacher_Subject);

			this.marks = new Array(this.Teacher_Subject.length);
		});

		this.Api.getTerms(this.idProfile, 'getTerm').map(res => res.json()).subscribe(data => {
			// console.log(data.terms);

			this.terms = data.terms;
		});

		this.Api.getTerms(this.idProfile, 'getExam').map(res => res.json()).subscribe(data => {
			// console.log(data.terms);

			this.exams = data;
		});
    }

	TeacherSubjects (classId, streamId, subjectId, className, streamName, subjectName) {
		this.className=className;
		this.streamName=streamName;
		this.subjectName=subjectName;

		this.classId=classId;
		this.streamId=streamId;
		this.subjectId=subjectId;

		this.title="Teacher";

		let schoolID = this.idProfile;

		// let link = "http://edlinkup.co.tz/classes/dataHandler.php?x=getstudentlist&x1=2018&x2=4&x3=5&x4=1&x5=2";

		this.Api.getTeacherSubjects(schoolID, classId, streamId).map(res => res.json()).subscribe(data => {
			console.log(data);

			this.classinfo = data.classinfo;

			// console.log(this.classinfo);

			this.stream = data.stream;

			// console.log(this.stream);

			this.Teacher_Subject = data.students;

			// console.log(this.Teacher_Subject);

			this.marks = new Array(this.Teacher_Subject.length);
		});

		this.Api.getTerms(this.idProfile, 'getTerm').map(res => res.json()).subscribe(data => {
			// console.log(data.terms);

			this.terms = data.terms;
		});

		this.Api.getTerms(this.idProfile, 'getExam').map(res => res.json()).subscribe(data => {
			// console.log(data.terms);

			this.exams = data;
		});
    }


	savemarks(){
		 if(this.exam==0){
			this.presentPrompt();
			return false;
		 }
		 if(this.term==0){
			 this.presentPromptTerm();
			return false;

		 }




	 for(var i=0; i<this.Teacher_Subject.length; i++){
		 this.marksid[i]=this.Teacher_Subject[i].id;
		}




	 this.Api.APIsaveResults(this.marksid,
	                         this.marks,
							 this.term,
							 this.exam,
							 this.classId,
							 this.streamId,
							 this.subjectId,
							 this.idMember,
							 this.idProfile
							 );
						this.presentToast("Result Saved");

						 console.log(this.marks);

	 /*for(var k=0; k<this.Teacher_Subject.length; k++){
		 this.marks[k]='';
		}


		*/

	 }


 presentPrompt() {

	  for(var i=0; i<this.exams.length; i++){
		 this.ExamName[i]={label:this.exams[i].exam,
		                   type:'radio',
						   value:this.exams[i].id
		                   };
	 }
  let alert = this.alertCtrl.create({
    title: 'Select Exam',
    inputs: this.ExamName,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
        this.exam=data;

        }
      }
    ]
  });
  alert.present();
}


presentPromptTerm() {

	  for(var i=0; i<this.terms.length; i++){
		 this.TermName[i]={label:this.terms[i].name,
		                   type:'radio',
						   value:this.terms[i].id
		                   };
	 }
  let alert = this.alertCtrl.create({
    title: 'Select Term',
    inputs: this.TermName,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
        this.term=data;
        }
      }
    ]
  });
  alert.present();
}


userphoto(x){

	  if((x=='')||(x==null)||(x=='undefined')){

		 return 'images/noimage.jpg';
	  }else{


		return x;
	  }

  }


  null_(x){

	  if((x=='')||(x==null)||(x=='undefined')){

		 return '';
	  }else{


		return x;
	  }

  }


  get_ExamScores(){

	  if(this.exam==0){
			this.presentPrompt();
			return false;
		 }
		 if(this.term==0){
			 this.presentPromptTerm();
			return false;

		 }

	 for(var i=0; i<this.Teacher_Subject.length; i++){
		 this.marksid[i]=this.Teacher_Subject[i].id;
		}


		this.Api.getExamScoreslink(this.marksid,
	                         this.marks,
							 this.term,
							 this.exam,
							 this.classId,
							 this.streamId,
							 this.subjectId,
							 this.idMember,
							 this.idProfile
							 ).map(res => res.json())
                              .subscribe(data => {
								  console.log(data);
		                       this.marks=data;
		                     });


	}


  max100(c,i) {
	  //c=parseInt(c);
	  if(c>10){


		  this.marks[i]=this.marks2[i];
		  //console.log(c);
	  }else{

		this.marks2[i]=c;
		   //console.log(c);

	  }
    //ToDo
}

	openExam(connect, id) {
		//$idSchool,$yrid,$classid,$stream,$term,$exam,$std
		//getExamResultsForStudent&x1=2&x2=2018&x3=17&x4=12&x5=1&x6=1&x7=1134
		//,year:2018,idSchool:idSchool,classid:classid,stream:stream,term:term,exam:exam,std:std
		// console.log(this.schoolProfile);
		if(id.length==0) {
			let alert = this.alertCtrl.create({
				title: 'No result yet', buttons: [{
					text: 'Ok',
					handler: () => {
						// this.exam=data;
					}
				}]
			});
			alert.present();
			return false;
		} else {
			this.navCtrl.push(ExamPage, { title:connect, id:id, data:this.Data, classid:this.Data.profile.classid, schoolstamp:this.Data.schoolprofile.Profile.stamp, schoolname:this.Data.schoolprofile.Profile.name, schoolProfile:this.schoolProfile });
		}
	}




	teachersubjectdiary(x){

		console.log(x);
		let link =this.Api.ApiPath+"=getteacherdiary&x1="+this.idSchool+"&x2="+this.classId+"&x3="+this.streamId+"&x4="+x+"&x5="+this.idMember+"&x6="+this.subjectId;
		this.http.get(link).map(res => res.json())
                              .subscribe(data => {
								  console.log(data);
								  this.getTdiary=[];
								   this.getTdiary=data;
		                       this.marks=data;
		                     });

	}


	getstudentdiary(x){

		let link =this.Api.ApiPath+"=getstudentdiary&x1="+x+"&x2="+this.studentid;
		console.log(link);
		this.http.get(link).map(res => res.json())
                              .subscribe(data => {
								   this.getdiary=data;
		  console.log(this.getdiary);
		                       this.marks=data;
		                     });

	}


	uploadUrl(x,y){

		 for(let i=0; i<this.Teacher_Subject.length; i++){
		 this.marksid[i]=this.Teacher_Subject[i].id;
		}
		let link =this.Api.ApiPath+"=study&x1="+this.idProfile+"&x3="+y+"&x2=&x4="+this.idMember+"&x5=&x6=";

		//let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
	this.imageURI
    let body = new FormData();
    body.append('post',x );
    body.append('arr', y);
	body.append('image',this.imageURI);
	body.append('student', this.marksid);
	body.append('priveleges',this.position);
	body.append('idMember',this.idMember);
	body.append('classid',this.classId);
	body.append('streamid',this.streamId);
	body.append('subjectid',this.subjectId);
	this.imageURI="";




       this.http.post(link, body)
        .subscribe(() => {
		   this.post ="";
          // console.log(data);
		  this.teachersubjectdiary(y)
        }, error => {
			 console.log(error);
			 //this.post =error;
            console.log("Oooops!");
        });

	}


	upload(x,y)
  {

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'image',
       fileName: 'name.jpg',
       headers: {},
	   params : {
                "post": x,
                "arr": y,
                "student": this.studentid,
                "priveleges": "teacher "+this.className+" "+this.streamName,
                "idMember":this.idMember,
                "classid": this.classId,
				"streamid":this.streamId,
				"subjectid":this.subjectId
            }

    }
 let loader = this.loadingCtrl.create({
   content: "Uploading..."
  });
 loader.present();
 console.log(this.imageURI);
 if(this.imageURI){

	console.log("Yes File");

fileTransfer.upload(this.imageURI,this.Api.ApiPath+"=postupdates&x1="+this.idProfile+"&x3="+y+"&x2=&x4="+this.idMember+"&x5=&x6=", options1)
 .then((data) => {
	 console.log(data);
    this.post ="";
	this.imageURI="";
	this.imageFileName= false;
    this.getstudentdiary(this.panel);
   loader.dismiss();
 }, (err) => {
	 console.log(err);
   loader.dismiss();

 });
 }else{

	console.log("No File");

		let link =this.Api.ApiPath+"=postupdates&x1="+this.idProfile+"&x3="+y+"&x2=&x4="+this.idMember+"&x5=&x6=";


    let body = new FormData();
	body.append('post',x );
    body.append('arr', y);
	body.append('image',this.studentid);
	body.append('student', this.studentid);
	body.append('priveleges',this.position);
	body.append('idMember',this.idMember);
	body.append('classid',this.classId);
	body.append('streamid',this.streamId);
	body.append('subjectid',this.subjectId);
	this.imageURI="";






       this.http.post(link, body)
        .subscribe(() => {
		this.post ="";
		this.getstudentdiary(this.panel);
        loader.dismiss();

        }, error => {
			 console.log(error);
			 loader.dismiss();
            console.log("Oooops!");
        });


 }



}




	 editPost(x,y) {

	  let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        { icon :'ios-create-outline',
          text: 'Edit Post',
          handler: () => {
			  console.log('Edit Post');
			  console.log(y);
			  console.log(x);
			  this.presentProfileModal(x,y);

          }
        },
        { icon:'ios-trash-outline',
          text: 'Delete',
          handler: () => {
			  console.log('Delete');
			  console.log(y);
			  console.log(x);
		      this.deletepost(x,y);
          }
        },
		{

		  icon:'ios-close-circle-outline',
          text: 'Cancel',
		  role: 'cancel'
        }
      ]
    });
    actionSheet.present();






}

presentProfileModal(x,y) {
	//console.log(x);
   let profileModal = this.modalCtrl.create(EditModalPage, { post:y.name});
   profileModal.onDidDismiss(data => {
     console.log(data);
	 if(data.role=='submit'){

		this.editpost(x,y,data.post);
	 }

   });
   profileModal.present();
 }


 editpost(x,y,z){

	 let link =this.Api.ApiPath+"=saveeditpost&x1=4";

	 let body = new FormData();
    body.append('post',z );
    body.append('idpost', y.id);
    this.post ='';
	this.getdiary[x].name=z;


       this.http.post(link, body)
        .subscribe(() => {

        }, error => {
			 console.log(error);
			 //this.post =error;
            console.log("Oooops!");
        });


 }
 deletepost(x,y){
	 let link =this.Api.ApiPath+"=deletepost&x1="+y.id;
	let body = new FormData();
    body.append('post','edited' );
    body.append('id', y.id);

	 this.http.post(link, body)
        .subscribe(() => {
        }, error => {
			 console.log(error);
			 //this.post =error;
            console.log("Oooops!");
        });




		(this.getdiary).splice(x, 1);



 }


    opentComment(id){
	this.navCtrl.push(CommentsPage,{id:id});
	}





		uploadClassDiary(x,y)
  {
     for(let i=0; i<this.Teacher_Subject.length; i++){
		// this.marksid=
		 this.marksid[i]=this.Teacher_Subject[i].id;
		}
		console.log(this.marksid);
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'image',
       fileName: 'name.jpg',
       headers: {},
	   params : {
                "post": x,
                "arr": y,
                "student": this.marksid,
                "priveleges": "teacher "+this.className+" "+this.streamName,
                "idMember":this.idMember,
                "classid": this.classId,
				"streamid":this.streamId,
				"subjectid":this.subjectId
            }

    }
 let loader = this.loadingCtrl.create({
   content: "Uploading..."
  });
 loader.present();




 console.log(this.imageURI);
 if(this.imageURI){

	console.log("Yes File");

fileTransfer.upload(this.imageURI,this.Api.ApiPath+"=study&x1="+this.idProfile+"&x3="+y+"&x2=&x4="+this.idMember+"&x5=&x6="+this.marksid, options1)
 .then((data) => {
	 console.log(data);
    this.post ="";
	this.imageURI="";
	this.imageFileName= false;
    this.teachersubjectdiary(y);
   loader.dismiss();
 }, (err) => {
	 console.log(err);
   loader.dismiss();

 });
 }else{

	console.log("No File");

		 for(let i=0; i<this.Teacher_Subject.length; i++){
		 this.marksid[i]=this.Teacher_Subject[i].id;
		}
		let link =this.Api.ApiPath+"=study&x1="+this.idProfile+"&x3="+y+"&x2=&x4="+this.idMember+"&x5=&x6="+this.marksid;


    let body = new FormData();
    body.append('post',x );
    body.append('arr', y);
	body.append('image',this.imageURI);
	body.append('student', this.marksid);
	body.append('priveleges',this.position);
	body.append('idMember',this.idMember);
	body.append('classid',this.classId);
	body.append('streamid',this.streamId);
	body.append('subjectid',this.subjectId);
	this.imageURI="";




       this.http.post(link, body)
        .subscribe(data => {
			console.log(data);
		   this.post ="";
        loader.dismiss();
		  this.teachersubjectdiary(y)
        }, error => {
			 console.log(error);
			 loader.dismiss();
            console.log("Oooops!");
        });


 }






}

	getImage (x, i) {
		this.indx=i;
		this.idstudent=x;

		let actionSheet = this.actionSheetCtrl.create({
			title: '',
			buttons: [
				{
					icon:'ios-image-outline',
					text: 'Gallery',
					handler: () => {
						this.picture(this.camera.PictureSourceType.PHOTOLIBRARY);
					}
				},

				{
					icon:'ios-camera-outline',
					text: 'Camera',
					handler: () => {
						this.picture(this.camera.PictureSourceType.CAMERA);
					}
				},

				{
					icon:'ios-close-circle-outline',
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});

		actionSheet.present();
	}

	picture (sourceType) {
		var options = {
			quality: 100,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true,
			allowEdit: true,
			width: 80,
			height: 80
		};

		this.camera.getPicture(options).then((imageData) => {
			this.imageURI = imageData;
			this.changeImage();
		}, (err) => {
			console.log(err);

			// this.presentToast(err);
		});
	}

	changeImage () {
		let link = this.Api.ApiPath+"=studentphoto&x1="+this.idstudent;

		const fileTransfer: FileTransferObject = this.transfer.create();

		let options1: FileUploadOptions = {
			fileKey: 'image',
			fileName: 'name.jpg',
			headers: {},
			params : {}
		}

		let loader = this.loadingCtrl.create({
			content: "Uploading..."
		});

		loader.present();

		fileTransfer.upload (this.imageURI, link, options1).then(() => {
			this.Api.getTeacherSubjects(this.idSchool, this.classId, this.stream).map(res => res.json()).subscribe(data => {
				this.studentProfile = data.studentsProfile;
			});

			// this.presentToast(JSON.stringify(data.response));

			// this.student[this.indx].photo=data.response;

			loader.dismiss();

		}, (err) => {
			console.log(err);

			loader.dismiss();
		});

    }

    getPDF(filePath) {
        let path=this.file.dataDirectory;

		let loader = this.loadingCtrl.create({
			content: "Downloading..."
        });

        loader.present();

        const fileTransferPDF: FileTransferObject = this.transfer.create();

        const options: DocumentViewerOptions = {
            print: { enabled: true },
        }

        // Download a file.

        fileTransferPDF.download(encodeURI(filePath), path + 'homework.pdf').then(entry => {
            let url = entry.toURL();

            loader.dismiss();

            if (this.platform.is('android')) {

                // Open the PDf with the correct OS PDFViewer tools
                this.fileOpener.open(url, 'application/pdf')
                    .then(() => console.log('File is opened'))
                    .catch(e => console.log('Error opening file', e));

            } else {

                this.documentViewer.viewDocument(url, 'application/pdf', options);

            }
        });
    }

    getMIMEtype(extn) {
        let ext=extn.toLowerCase();

        let MIMETypes = {
            'txt' : 'text/plain',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'doc' : 'application/msword',
            'pdf' : 'application/pdf',
            'jpg' : 'image/jpeg',
            'bmp' : 'image/bmp',
            'png' : 'image/png',
            'xls' : 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'rtf' : 'application/rtf',
            'ppt' : 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        }

        return MIMETypes[ext];
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad ManagerPage');
	}

}
