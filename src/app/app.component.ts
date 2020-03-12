import { Component, OnInit } from '@angular/core';

import { Platform,MenuController, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkProviderService } from './network-provider.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  	public selectedIndex = 0;
  	public appPages = [
		{
		title: 'Inbox',
		url: '/folder/Inbox',
		icon: 'mail'
		},
		{
		title: 'Outbox',
		url: '/folder/Outbox',
		icon: 'paper-plane'
		},
		{
		title: 'Favorites',
		url: '/folder/Favorites',
		icon: 'heart'
		},
		{
		title: 'Archived',
		url: '/folder/Archived',
		icon: 'archive'
		},
		{
		title: 'Trash',
		url: '/folder/Trash',
		icon: 'trash'
		},
		{
		title: 'Spam',
		url: '/folder/Spam',
		icon: 'warning'
		}
  	];
  	public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private menu: MenuController,
		private navCtrl: NavController,
		public networdProvider: NetworkProviderService,
		public network: Network,
		public alertController: AlertController
	) {
    	this.initializeApp();
  	}

  	initializeApp() {
		this.platform.ready().then(() => {
			// this.statusBar.styleDefault();
			this.menu.enable(false);
			this.splashScreen.hide();
			let expiry_date:any = localStorage.getItem('expiry_date');
			if(expiry_date != null && expiry_date != undefined){
				let expiryDate = new Date(expiry_date);
				let today = new Date();
				if ( today > expiryDate) { 
					localStorage.removeItem('subscription_status');
					localStorage.removeItem('expiry_date');
					this.navCtrl.navigateRoot('subscription',{animationDirection: 'forward'});
				}
			}
			this.network.onDisconnect().subscribe(() => {
				this.showAlert();
			});
			this.network.onConnect().subscribe(() => {
				
			});
		});
  	}
	
	async showAlert(){
		const alert = await this.alertController.create({
			header: 'Alert',
			subHeader: 'Internet Connection Error',
			message: 'You do not have internet connection!',
			buttons: [
				{
					text: 'OK',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						navigator['app'].exitApp();
					}
				}
				  
			]
		  });
	  
		await alert.present();
	}

  	ngOnInit() {
		let loginStatus:any = localStorage.getItem('login_status');
			if(loginStatus != null && loginStatus == 'true'){
				this.navCtrl.navigateRoot('home');
			}
		// const path = window.location.pathname.split('folder/')[1];
		// if (path !== undefined) {
		//   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
		// }
	}
}
