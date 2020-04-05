import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StudentReportPage } from '../student-report/student-report';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
pdfMake.vfs=pdfFonts.pdfMake.vfs;

@Component({
	selector: 'page-exam',
  templateUrl: 'exam.html',
})

export class ExamPage {
	title:any;
	ids:any;
	imgadd: string =this.Api.imgadd;
	imgaddlogo: string =this.Api.imgaddlogo;
	StudentMax:any;
	year:any;
	term:any;
	exam:any;
	classId:any;
	streamId:any;
	subjectId:any;
	idMember:any;
	idProfile:any;
	schoolstamp:any;
	reportPage: any = StudentReportPage;
	schoolname: any;
	pdfObj=null;
	subject: any;
	base64Image: string;
	photo: any;
	datas: any;
	base64ImageStamp: string;
	base64ImageLogo: string;
	pdfObjDisabled: boolean;
	schoolProfile: any;

	constructor(public navCtrl: NavController, public toastController: ToastController, private plt: Platform, public http: Http, public navParams: NavParams, public Api:ApiProvider, private file: File, public loadingCtrl: LoadingController, private fileOpener: FileOpener) {
		this.title = navParams.get('title');
		this.ids = navParams.get('id')[0];
		this.datas=navParams.get('data');
		this.classId= navParams.get('classid');
		this.schoolstamp=navParams.get('schoolstamp');
		this.schoolname=navParams.get('schoolname');
		this.schoolProfile=navParams.get('schoolProfile');
		this.year= this.ids.year;
		this.term= this.ids.term;
		this.exam= this.ids.exam;
		this.streamId= this.ids.stream;
		this.subjectId= this.ids.subject;
		this.idMember= this.ids.std;
		this.idProfile= this.ids.idSchool;
		this.classId= this.ids.class;
		this.get_ExamResults();
		this.pdfImage();
		this.stampImage();
		this.schoolLogoImage();
		this.reportPage=StudentReportPage;
	}

	userphoto(x){
		if ((x=='') || (x==null)) {
			return 'images/noimage.jpg';
		} else {
			return x;
		}
	}

	get_ExamResults() {
		this.Api.getExamResults(this.year, this.term, this.exam, this.classId, this.streamId, this.subjectId, this.idMember, this.idProfile)
		.map(res => res.json()).subscribe(data => {
        	this.ids=data[0];
			this.StudentMax=data[0].subject;
		});
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: 'Creating a PDF file...',
			duration: 7000,
			position:'middle',
			cssClass: "toast-container",
		});

		toast.present();
	}

	presentLoadingCustom () {
		let loading = this.loadingCtrl.create({
			content: "Creating a PDF file...",
			duration: 7000,
			spinner: 'bubbles',
		});

		loading.present().then(() => {
			loading.dismiss();
		});
	}

	createPdf() {
		// console.log(this.schoolProfile);

		let d = this.StudentMax;
		let e = this.ids.gradelevol;

		var externalDataRetrievedFromServer=[];
		var levolDataRetrievedFromServer=[];

		for(let x = 0; x < d.length; x++) {
			externalDataRetrievedFromServer.push(d[x]);
		}

		for(let index = 0; index < e.length; index++) {
			levolDataRetrievedFromServer.push((e[index].grade+': ')
				.concat((e[index].uppermarks+' - ')).concat(e[index].lowermarks+' ').concat(e[index].remarks)
			);
		}

		function buildTableBody(data, columns) {
			var body = [];

			body.push(columns);

			data.forEach(function(row) {
				var dataRow = [];

				columns.forEach(function(column) {
					dataRow.push(row[column]);
				})

				body.push(dataRow);
			});

			return body;
		}

		function table(data, columns) {
			return {
				style: 'datatable',
				table: {
					headerRows: 1,
					widths: [ '*', '*', '*', '*' ],
					body: buildTableBody(data, columns)
				}
			};
		}

      	var docDefinition = {
			content: [
				{
					columns: [
						{
							image: this.base64Image, width: 120, height: 120
						},

						[
							{ text: this.schoolname.toUpperCase(), alignment: 'center', style:'header' },
							{ text: 'RegistrationID: '+(this.schoolProfile.registration), alignment: 'center', style:'sub_header' },
							{ text: 'P.O.Box: '+(this.schoolProfile.pobox+' ').concat(this.schoolProfile.physical_location), alignment: 'center', style:'sub_header' },
							{ text: 'Tel: '+(this.schoolProfile.tel), alignment: 'center', style:'sub_header' },
							{ text: 'Email: '+(this.schoolProfile.email), alignment: 'center', style:'sub_header' },
							{ text: (this.schoolProfile.motto), alignment: 'center', style:'sub_header' },
						],

						{
							image: this.base64ImageLogo, width: 120, height: 120
						}
					]
				},'\n',

				{
					columns: [
						[
							{ text: (this.ids.name).toUpperCase() },
						],

						[

						],

						[
							{ text: (this.ids.classname)+' '+(this.ids.streamname).toUpperCase(), style:'sub_header_stream' },
						]
					]
				},'\n',

				{ canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 3 } ]},'\n',
				// {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 3 }]}

				// term name and exams name
				{ text: (this.ids.termname+' REPORT - ').concat(this.ids.examname) + (', ' + this.ids.year) +'\n', alignment: 'center', style:'sub_header', bold:true },'\n',

				// get grading system
				levolDataRetrievedFromServer.join(' | '),'\n',

				table(externalDataRetrievedFromServer, ['subject', 'marks', 'grade', 'teachersubject']),

				{
					style: 'tableExample',
					table: {
						headerRows: 1,
						widths: [ '*', '*', '*', '*' ],
						body: [
							[
								{ text: 'TOTAL SCORE', style: 'tableHeader' },
								{ text: this.ids.total, style: 'tableHeader' },
								{ text: 'DIVISION', style: 'tableHeader' },
								{ text: this.ids.division, style: 'tableHeader' }
							],

							[
								{ text: 'AVERAGE', style: 'tableHeader' },
								{ text: this.ids.average, style: 'tableHeader' },
								{ text: 'POINT', style: 'tableHeader' },
								{ text: this.ids.points, style: 'tableHeader' }
							],
						]
					},

					layout: {
						hLineWidth: function(i, node) { return (i === 1 || i === 2) ? 1 : 0; }
					}
				},'\n\n',

				{
					style: 'tableExample',
					table: {
						headerRows: 1,
						widths: [ '*', '*', '*', '*' ],
						body: [
							[
								{ text: 'GRADE', style: 'tableHeader' },
								{ text: 'REMARK', style: 'tableHeader' },
								{ text: 'RANK', style: 'tableHeader' },
								{ text: 'OUT OF', style: 'tableHeader' }
							],

							[
								{ text: this.ids.grade, alignment:'center' },
								{ text: this.ids.remark, alignment:'center' },
								{ text: this.ids.rank, alignment:'center' },
								{ text: this.ids.studenttotal, alignment:'center' }
							],
						]
					},
				},'\n\n',

				{
					style: 'tableExample',
					table: {
						headerRows: 1,
						widths: [ '*', '*', '*' ],
						body: [
							[
								{ text: '', style: 'tableHeader' },
								{ text: '', style: 'tableHeader' },
								{ text: '', style: 'tableHeader' }
							],

							[
								{ text: 'Class Teacher'+'\n'+this.ids.teacher, alignment:'center', style:'bottomtable' },
								{ image: this.base64ImageStamp, width: 100, height: 60, alignment:'center' },
								{ text: 'Head of School'+'\n'+this.ids.headteacher, alignment:'center', style:'bottomtable' }
							],
						]
					},
					layout: 'noBorders',
				},'\n',
			],

			styles: {
				header: {
				bold: true,
				fontSize: 16,
				textTransform: 'uppercase',
				margin: [0,0,0,15]
				},
				sub_header: {
				fontSize: 14,
				alignment: 'center',
				margin: [0,5,0,0]
				},
				sub_header_stream: {
				margin: [0, 0, -15, 15]
				},
				header_note: {
				bold: true,
				fontSize: 12,
				},
				name_style: {
				bold: true,
				fontSize: 12,
				uppercase: true
				},
				itemsTable: {
				alignment: 'center',
				margin: [0, 5, 0, 15]
				},
				itemsTableHeader: {
				bold: true,
				fontSize: 12,
				color: 'black'
				},
				tableHeader: {
				alignment:'center',
				bold: true,
				fontSize: 12,
				color: 'black'
				},
				bottomtable: {
				margin: [0, 5, 0, 0]
				},
				url: {
				fontSize: 16,
				alignment: 'right'
				},
				pdfImage: {
				width: 612.00,
				height: 792.00
				},
				datatable: {
				alignment: 'center',
				fontSize: 12,
				uppercase: true,
				color: '#757575',
				margin: [0, 8, 0, 0]
				}
			},

			defaultStyle: {
				alignment: 'justify'
			},

			// Page Footer
			footer : function(currentPage, pageCount) {
				return {
					alignment : 'center',
					text      : currentPage.toString() + ' of ' + pageCount,
					fontSize  : 8
				}
			}
		}

		this.pdfObj=pdfMake.createPdf(docDefinition);

		this.presentLoadingCustom();

		this.pdfObjDisabled=true;

		this.downloadPdf();
	}

	downloadPdf() {
		if (this.plt.is('cordova')) {
		this.pdfObj.getBuffer((buffer) => {
		var blob = new Blob([buffer], { type: 'application/pdf' });
		// Save the PDF to the data Directory of our App
		this.file.writeFile(this.file.dataDirectory, this.ids.name+'_report.pdf', blob, { replace: true }).then(fileEntry => {
		// Open the PDf with the correct OS tools
		this.fileOpener.open(this.file.dataDirectory + this.ids.name+'_report.pdf', 'application/pdf');
		})
		});
		} else {
		// On a browser simply use download!
		this.pdfObj.download();
		}
	}

	pdfImage() {
	let imageUrl = this.imgaddlogo+this.datas.profile.photo;
	this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
	this.base64Image = 'data:image/jpg;base64,'+base64data;
	});
	}

	stampImage() {
	let imageUrl = this.imgaddlogo+this.datas.schoolprofile.Profile.stamp;
	this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
	this.base64ImageStamp = 'data:image/jpg;base64,'+base64data;
	});
	}

	schoolLogoImage() {
	let imageUrl = this.imgaddlogo+this.datas.schoolprofile.Profile.logo;
	this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
	this.base64ImageLogo = 'data:image/jpg;base64,'+base64data;
	});
	}

	getBase64ImageFromURL(url: string) {
	return Observable.create((observer: Observer<string>) => {
	let img = new Image();
	img.crossOrigin = 'Anonymous';
	img.src = url;
	if (!img.complete) {
	img.onload = () => {
	observer.next(this.getBase64Image(img));
	observer.complete();
	};
	img.onerror = (err) => {
	observer.error(err);
	};
	} else {
	observer.next(this.getBase64Image(img));
	observer.complete();
	}
	});
	}

	// convert it to Base64 and then save to local storage
	getBase64Image(img: HTMLImageElement) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);

	// set image quality
	var dataURL = canvas.toDataURL("image/png", 0.9);

	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad ExamPage');
	}
}
