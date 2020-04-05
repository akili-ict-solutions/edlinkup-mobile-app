import {  Component } from '@angular/core';
import {  NavController, NavParams,ModalController, Platform  } from 'ionic-angular';
import {  CommentPage} from "../comment/comment";
import {  ApiProvider } from '../../providers/api/api';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { EditModalPage } from "../edit-modal/edit-modal";
import { ManagePage} from "../manage/manage";
import {CommentsPage} from "../comments/comments";
import { AlertController , ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileTransferObject,FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';

/*
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
    imageURI:any;
    imageFileName:boolean = false;
    title:any;
    id:any;
    idProfile:any='';
    idMember:any='';
    position:any='';
    idUser:any='';
    data:any='';
    post:any='';
    tasks:any='';
    tasks_:any='';
    Profile:any='';
    user:any='';
    panel:any='';
    classesreports:any=new Array();
    classesreport:any='';
    likeStatus:boolean=false;
    imgadd: string =this.Api.imgadd;
    imgaddlogo: string =this.Api.imgaddlogo;
    schoolprofiledata: any=new Array();
    profiledata: any;

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams,
          public http:Http, public actionSheetCtrl: ActionSheetController, public Api:ApiProvider, private storage: Storage,
          private transfer: FileTransfer, private camera: Camera, public loadingCtrl: LoadingController,
          public toastCtrl: ToastController, public modalCtrl: ModalController, private plt: Platform, private fileOpener: FileOpener, private file: File, private documentViewer: DocumentViewer) {
        //this.tasks = navParams.get('id');
        this.panel = navParams.get('panel');
        this.title = navParams.get('title');
        this.idProfile = navParams.get('id');
        this.idMember= navParams.get('idMember');
        this.position= navParams.get('position');
        this.profiledata=navParams.get('profile');

        storage.get('iduser').then((val) => {
            this.idUser=val;
        });

        if(this.title=='Teacher_Result'){
            this.getteacherReport(this.idMember);
        }
        if(this.title=='My_Student'){
            this.getteacherReport2(this.idMember);
        }
        if(this.title=='Class_Diary'){
            this.getteacherReport2(this.idMember);
        }
        if(this.title=='Class_Homework'){
            this.getteacherReport2(this.idMember);
        }
        if(this.title=='Class_Materials'){
            this.getteacherReport2(this.idMember);
        }
        if(this.title=='Profile'){
            this.schoolProfile(this.idProfile);
        }
        if(this.title=='Timeline'){
            this.myUpdates();
        }else{
            this.tasks=this.idProfile;
        }
        if(this.title=='Events'){
            this.myUpdates();
        }else{
            this.tasks =this.idProfile;
        }
        if(this.title=='Job'){
            this.myUpdates();
        }else{
            this.tasks=this.idProfile;
        }
        if(this.title=='School_Timeline'){
            this.panel='news';
            this.Updates();
        }else{
            this.tasks=this.idProfile;
        }
        if(this.title=='School_Events'){
            this.panel='event';
            this.Updates();
        }else{
            this.tasks=this.idProfile;
        }
        if(this.title=='School_Job'){
            this.panel='job';
            this.Updates();
        }else{
            this.tasks=this.idProfile;
        }
  }


    openManager (name, id, connect){
        this.navCtrl.push(ManagePage, { title: connect, name: name, id: id, idProfile: id.idSchool, idMember: id.teacher });
    }

    getteacherReport (id) {
        this.Api.get_teacherReport(id).map(res => res.json()).subscribe(data => {
            console.log(data);

            this.classesreport = data;
        });
    }

    getteacherReport2 (id) {
        // https://edlinkup.co.tz/classes/dataHandler.php?x=get_teacherreport2&x1=1118

        this.http.get(this.Api.ApiPath + '=get_teacherreport2&x1=' + id).map(res => res.json()).subscribe(data => {
            console.log(data);

            this.classesreports = data;
        });
    }

    schoolProfile (id) {
        this.schoolprofiledata = this.idProfile;
    }

myUpdates(){
    // console.log(this.Api.ApiPath+'=Myupdates&x1='+this.idUser+'&x2='+this.idMember);

    this.http.get(this.Api.ApiPath+'=Myupdates&x1='+this.idUser+'&x2='+this.idMember+'&x3='+this.panel).map(res => res.json())
    .subscribe(data => {
    console.log(data);
    this.tasks_ =data;
    });
}

   Updates(){
	  // console.log(this.Api.ApiPath+'=Myupdates&x1='+this.idUser+'&x2='+this.idMember);

	 this.http.get(this.Api.ApiPath+'=schoolupdatesmob&x1='+this.idProfile+'&x2='+this.panel).map(res => res.json())
       .subscribe(data => {
		   console.log(data);
		this.tasks_ =data;
		});

  }
   openLikes(item,i,likes,status){
	  if(status=='true'){

				this.tasks[i].likeStatus='false';
				this.tasks[i].likes--;

			}else{
				this.tasks[i].likeStatus='true';
				this.tasks[i].likes++;

			}

			this.storage.get('iduser').then((val) => {

			 this.Api.likesUrl(item,val);
  });




       // this.http.get('http://spmelimu.com/august2017/classes/dataHandler.php?x=likes&x1='+item+'&x2='+51)
       //.map(res => res.json())
       // .subscribe(data => {
       // });

   }




 SharePost(x,y,i){

  if(y!=''){

				this.tasks[i].shared='true';
			}else{
				this.tasks[i].shared='';

			}

   this.storage.get('iduser').then((val) => {
              this .Api.SharePost(x,val);

  });
}


 opentComment(id,photo,name){
	this.navCtrl.push(CommentsPage,{id:id,user:this.user});
	}




	getImage() {

	  let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {icon:'ios-image-outline',
          text: 'Gallery',
          handler: () => {

  this.picture(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        { icon:'ios-camera-outline',
          text: 'Camera',
          handler: () => {


  this.picture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {icon:'ios-close-circle-outline',
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();






}
	adjustTextarea(event: any): void {
	let textarea: any		= event.target;
	textarea.style.overflow = 'hidden';
	textarea.style.height 	= 'auto';
	textarea.style.height 	= textarea.scrollHeight + 'px';
	return;
}


  picture(sourceType){

	   var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true,
	allowEdit: true
  };

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
	this.imageFileName= true;
  }, (err) => {
    console.log(err);
    //this.presentToast(err);
  });
  }


userphoto(x){

	  if((x=='')||(x==null)||(x=='undefined')){

		 return 'images/noimage.jpg';
	  }else{


		return x;
	  }

  }


	upload(x,y){


		let link =this.Api.ApiPath+"=postupdates&x1=2&x3="+y+"&x2=&x4="+this.idMember+"&x5=&x6=";


    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'image',
       fileName: 'name.jpg',
       headers: {},
	   params : {
                "post": x,
                "arr": y,
                "priveleges": "Teacher",
                "idMember":this.idMember,
                "idUser": this.idUser
            }

    }
 let loader = this.loadingCtrl.create({
   content: "Uploading..."
  });
 loader.present();








 console.log(this.imageURI);
 if(this.imageURI){

	console.log("Yes File");



fileTransfer.upload(this.imageURI,link, options1)
 .then((data) => {
    this.post ="";
	this.imageURI="";
	this.imageFileName= false;
	/*this.Api.getUpdates(0,10,'news',this.idUser).map(res => res.json())
       .subscribe(data => {
        this.data = data;
		this.tasks=this.data.updates;

       });
	   */
	  //  Myupdates

	   this.myUpdates();
   loader.dismiss();
 }, (err) => {
	 console.log(err);
   loader.dismiss();

 });

 }else{

	console.log("No File");


    let body = new FormData();
    body.append('post',x );
    body.append('arr', y);
	body.append('image','');
	body.append('priveleges','Teacher');
	body.append('idMember',this.idMember);
	body.append('idUser',this.idUser);




       this.http.post(link, body)
        .subscribe(data => {
		    this.post ="";
	        this.imageURI="";
	        this.imageFileName= false;

	   this.myUpdates();
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
		 console.log(y);
		 this.editpost(x,y,data.post);
	 }

   });
   profileModal.present();
 }


 editpost(x,y,z){

	 let link =this.Api.ApiPath+"=saveeditpost&x1=4";

	 console.log(link);

	 let body = new FormData();
    body.append('post',z );
    body.append('idpost', y.id);
    this.post ='';
	this.tasks_[x].name=z;

       this.http.post(link, body)
        .subscribe(data => {
		console.log("ok");
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
        .subscribe(data => {
        }, error => {
			 console.log(error);
			 //this.post =error;
            console.log("Oooops!");
        });




		(this.tasks_).splice(x, 1);



 }

previewPDF(path, name) {
  const options: DocumentViewerOptions = {
    title: name
  }

  this.documentViewer.viewDocument(path, 'application/pdf', options)
}
}
