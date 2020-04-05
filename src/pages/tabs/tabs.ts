import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { ConnectPage } from '../connect/connect';
import { HomePage    } from '../home/home';
import {MessagePage} from "../message/message";
import {NotificationPage} from "../notification/notification";
import {  ApiProvider } from '../../providers/api/api';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  NotificationStatus:any='';
  MessageStatus:any ='';
  
  public hideTabs:boolean = true;

  tab1Root = HomePage;
  tab2Root = AccountPage;
  tab3Root = ConnectPage;
  tab4Root = NotificationPage;
  tab5Root = MessagePage;
  constructor(public Api:ApiProvider,public http:Http, public storage: Storage) {
	 this.storage.get('iduser').then((val) => {
		this.http.get(this.Api.ApiPath+'=get_notification_status&x1='+val).map(res=> res.json())
        .subscribe(data => {
		this.MessageStatus=data.message;
		this.NotificationStatus=data.notification;
		// console.log(data);
		});		
	 }); 
   
  }
  
}
