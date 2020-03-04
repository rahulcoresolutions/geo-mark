import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { PopOverComponent } from '../pop-over/pop-over.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public imagesArray:any = [];
	public havePermissions:any = false;
	  constructor(public navCtrl: NavController, public androidPermissions: AndroidPermissions, public file: File, 
		private photoViewer: PhotoViewer, private webview: WebView,
		public popoverController: PopoverController
		) { }

  	ngOnInit() {

		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((result:any)=>{
			this.havePermissions = result.hasPermission;
			if(result.hasPermission == false){
				this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((result)=>{
					this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then((result)=>{
						if(result.hasPermission == false){
							this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(()=>{
								this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then((result:any)=>{
									if(result.hasPermission == false){
										this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then((result)=>{
											this.getListItems();
										});
									}
								});
							});
						}
					});
				});
			}
		});
	  }
	  
	ionViewWillEnter(){
		this.getListItems();
		
	}

	doRefresh(event){
		setTimeout(() => {
			this.getListItems();
			event.target.complete();
		}, 2000);
	}
	
	getListItems(){
		this.imagesArray = localStorage.getItem('images');
		if(this.imagesArray != null){
			this.imagesArray = JSON.parse(this.imagesArray);
			this.imagesArray = this.imagesArray.reverse();
		}else{
			this.imagesArray = [];
		}
		// console.log(this.file.externalRootDirectory);
		// this.file.listDir(this.file.externalRootDirectory,'geo_captured').then((result)=>{
		// 	this.imageFiles = result;
		// 	console.log(result);
		// });
		// console.log('here');
	}

	takePicture(){
		this.navCtrl.navigateRoot('take-picture',{animationDirection:'forward'});
	}

	startRecording(){
		this.navCtrl.navigateRoot('start-recording',{animationDirection: 'forward'});
	}

	previewImage(image){
		let imagePath = this.file.externalRootDirectory+'geo_captured/'+image.image;
		this.photoViewer.show(imagePath,image.image,{share: true});
	}

	showPopover(){
		this.presentPopover(event).then((result)=>{
			console.log(result);
		});
	}

	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
		  component: PopOverComponent,
		  event: ev,
		  translucent: true,
		  componentProps: {homeref:this}
		});
		popover.onDidDismiss().then((result)=>{
			if(result.data == 'refresh'){
				this.getListItems();
			}
		});
		return await popover.present();
	}
	
}
