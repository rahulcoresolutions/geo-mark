import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { API_URL } from 'src/constant';

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
	

	async presentToast(message,duration = 2000) {
		const toast = await this.toastController.create({
			message: message,
			duration: duration,
			position: 'top'
		});
		return await toast.present();
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

	register(data){
		return new Promise((resolve,reject)=>{
			this.http.post(API_URL+'register',JSON.stringify(data)).subscribe((result)=>{
				resolve(result);
			},err=>{
				reject(err);
			});
		});
	}

	login(data){
		return new Promise((resolve,reject)=>{
			this.http.post(API_URL+'login',JSON.stringify(data)).subscribe((result)=>{
				resolve(result);
			},err=>{
				reject(err);
			});
		});
	}

	subscribe(data){
		return new Promise((resolve,reject)=>{
			this.http.post(API_URL+'subscribe',JSON.stringify(data)).subscribe((result)=>{
				resolve(result);
			},err=>{
				reject(err);
			});
		});
	}

	getSubscription(data){
		return new Promise((resolve,reject)=>{
			this.http.post(API_URL+'validatesubscription',JSON.stringify(data)).subscribe((result)=>{
				resolve(result);
			},err=>{
				reject(err);
			});
		});
	}

	getAdress(data){
		return new Promise((resolve,reject)=>{
			this.http.post(API_URL+'getAddress',JSON.stringify(data)).subscribe((result)=>{
				resolve(result);
			},err=>{
				reject(err);
			});
		});
	}
}
