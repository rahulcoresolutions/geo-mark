import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public mobile:any;
	public password:any;
  	constructor(public navCtrl: NavController, public menuCtrl: MenuController, protected apiService: ApiService) { 
		
	}

  	ngOnInit() {
	}
	  
	login(){
		if(this.mobile == '' || this.password == ''){
			this.apiService.presentToast('Please fill mobile and password');
			return false;
		}
		let data = {
			mobile: this.mobile,
			password: this.password
		};
		this.apiService.presentLoading().then(()=>{
			this.apiService.login(data).then((result:any)=>{
				let subscription = result.user.subscription;
			
				if(subscription.id != undefined){
					let today =  new Date();
					let expiryDate = new Date(subscription.expiry_date);
					if(expiryDate >= today){
						localStorage.setItem('expiry_date',subscription.expiry_date);
						localStorage.setItem('subscription_status','true');
					}else{
						localStorage.removeItem('expiry_date');
						localStorage.removeItem('subscription_status');
					}
				}
				this.apiService.loading.dismiss();
				localStorage.setItem('user',JSON.stringify(result.user));
				localStorage.setItem('login_status','true');
				let subsciption = localStorage.getItem('subscription_status');
				if(subsciption == null || subsciption == undefined || subsciption == ''){
					this.navCtrl.navigateForward('subscription');
				}else{
					this.navCtrl.navigateRoot('home');
				}
			},err=>{
				this.apiService.loading.dismiss();
				this.apiService.presentToast(err.error.message);
			});
		});
	}

	signup(){
		this.navCtrl.navigateForward('register');
	}

	enterToLogin(ev){
		if(ev.keyCode == 13){
			this.login();
		}
	}

	ionViewWillEnter(){
		// this.menuCtrl.enable(false);
	}

}
