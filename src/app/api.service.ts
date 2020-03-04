import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	public loading:any;
	protected maxTimeout:any = 6000;
  	constructor(
    	public toastController: ToastController, 
    	public http: HttpClient, 
    	public loadingController: LoadingController,
    	private alertCtrl: AlertController
	) { }
	

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000,
			position: 'top'
		});
		await toast.present();
	}

	async presentAlert(header,message) {
		const alert = await this.alertCtrl.create({
		  header: header,
		  message: message,
		  buttons: ['OK']
		});
	
		await alert.present();
	}

	async presentLoading() {
		this.loading = await this.loadingController.create({
			spinner: 'crescent',
			message: 'Please wait...',
		});
		return await this.loading.present();
	}

	getLocation(lat,long){
		return new Promise((resolve,reject)=>{
			this.http.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+','+long+'&key=1da5ec3afbc048eeb9e49c9d4aea012c').subscribe((res)=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}
}
