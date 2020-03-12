import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController, PopoverController } from '@ionic/angular';
import { PopOverComponent } from '../pop-over/pop-over.component';
declare var RazorpayCheckout:any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

	private razor_key:any = 'rzp_live_FJDReqw2UiIYtD';
	private currency:any = 'INR';
  	constructor(public apiService: ApiService, public navCtrl: NavController, public popoverController: PopoverController) { }

  	ngOnInit() {
	  }
	  
	
	payNow() {
		let user:any = JSON.parse(localStorage.getItem('user'));
        var options = {
            description: 'Subscription Charges',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: this.currency, 
            key: this.razor_key, 
            amount: 30000,
            name: 'foo',
            prefill: {
                email: user.email,
                contact: user.mobile,
                name: user.name
            },
            theme: {
                color: '#573a3e'
            },
            modal: {
                ondismiss: function () {
                    this.toastPresent('Payment Cancelled.');
                }
            }
        };
    
        var successCallback = (payment_id) => {
			this.apiService.presentLoading().then(()=>{
				let user:any = JSON.parse(localStorage.getItem('user'));
				let data = {
					user_id: user.id,
					payment_id: payment_id
				};
				this.apiService.subscribe(data).then((result:any)=>{
					this.apiService.loading.dismiss();
					localStorage.setItem('subscription_status','true');
					localStorage.setItem('expiry_date',result.expiry_date);
					this.apiService.presentToast('Subscription updated successfully!');
					this.navCtrl.navigateRoot('home',{animationDirection: 'forward'});
				},err=>{
					this.apiService.loading.dismiss();
					console.log(err);
					// alert('Unable to save your subscription, please contact admin');
				});
			});
			
                
        };
    
        let cancelCallback = (error)  => {
            this.apiService.presentToast('Payment Cancelled.');
        };
    
        RazorpayCheckout.open(options, successCallback, cancelCallback);
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
			
		});
		return await popover.present();
	}
}
