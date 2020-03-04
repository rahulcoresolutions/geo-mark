import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {

  	constructor(public navParams: NavParams, public viewController: PopoverController, public navCtrl: NavController) { }

  	ngOnInit() {}


	doRefresh(){
		this.viewController.dismiss('refresh');
		// console.log(this.navParams.data.homeref);
		// this.navParams.data.homeref.doRefresh(event);
	}

	logout(){
		localStorage.removeItem('login_status');
		this.viewController.dismiss('logout');
		this.navCtrl.navigateRoot('login',{animationDirection: 'forward'});
	}
}
