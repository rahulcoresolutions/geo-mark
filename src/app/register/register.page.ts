import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	name:any;
	mobile:any;
	email:any;
	password:any;
  	constructor(
		public apiService: ApiService,
		public navCtrl: NavController
	) { }

  	ngOnInit() {
  	}
	
	signup(){
		if(
			(this.name == '' || this.name == undefined) || 
			(this.email == '' || this.email == undefined) || 
			(this.mobile == '' || this.mobile == undefined) || 
			(this.password == '' || this.password == undefined)){
			this.apiService.presentToast('Please fill all fields');
			return false;
		}
		if(this.mobile.toString().length > 10 || this.mobile.toString().length < 10){
			this.apiService.presentToast('Enter correct mobile number');
			return false;
		}
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){
  		}else{
			this.apiService.presentToast('Enter correct email id');
			return false;
		}
		console.log('here');
		let data = {
			name: this.name,
			mobile: this.mobile,
			email: this.email,
			password: this.password
		};
		this.apiService.presentLoading().then(()=>{
			this.apiService.register(data).then((res)=>{
				this.apiService.loading.dismiss();
				this.apiService.presentToast('Registered successfully!');
				this.navCtrl.navigateRoot('login',{animationDirection: 'forward'});
			},err=>{
				this.apiService.loading.dismiss();
				this.apiService.presentToast(err.error.message);
			});
		});
	}

	login(){
		this.navCtrl.navigateBack('login');
	}
}
