import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public username:any;
	public password:any;
  	constructor(public navCtrl: NavController, public menuCtrl: MenuController, protected ApiService: ApiService) { 
		
	}

  	ngOnInit() {
	}
	  
	login(){
		if(this.username == '' || this.password == ''){
			this.ApiService.presentToast('Please fill username and password');
			return false;
		}
		if(this.username == 'user' && this.password == 'user'){
			this.navCtrl.navigateRoot('home',{animationDirection: 'forward'});
			localStorage.setItem('login_status','true');
		}else{
			this.ApiService.presentToast('Wrong user details');
			return false;
		}
	}

	ionViewWillEnter(){
		// this.menuCtrl.enable(false);
	}

}
