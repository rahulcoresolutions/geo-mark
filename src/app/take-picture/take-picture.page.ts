import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ApiService } from '../api.service';
import { File } from '@ionic-native/file/ngx';
import * as watermark from 'watermarkjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.page.html',
  styleUrls: ['./take-picture.page.scss'],
})
export class TakePicturePage implements OnInit {
	
	public address:any;
	public lat:any;
	public long:any;
	public showHide:any = true;
	public originalImage:any;
	public blobImage:any;
	public font_size:any;
  	constructor(private cameraPreview: CameraPreview, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, private apiService: ApiService, public file: File, public navCtrl: NavController) { 

	}

  	ngOnInit() {
  	}
	
	ionViewWillEnter(){
		this.getLocation();
		const cameraPreviewOpts: CameraPreviewOptions = {
			x: 0,
			y: 0,
			width: window.screen.width,
			height: window.screen.height,
			camera: 'rear',
			tapPhoto: true,
			previewDrag: true,
			toBack: true,
			alpha: 1
		  }
		this.cameraPreview.startCamera(cameraPreviewOpts).then(
			(res) => {
			  console.log(res)
			},
			(err) => {
			  console.log(err)
		});  
	}


	clickPicture(){
		const pictureOpts: CameraPreviewPictureOptions = {
			// width: 1280,
			// height: 1280,
			quality: 85,
			
		}
		this.showHide = false;
		this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
			let picture = 'data:image/jpeg;base64,' + imageData; 
			this.originalImage = picture;
			fetch(this.originalImage)
				.then(res => res.blob())
				.then(blob => {
				this.blobImage = blob;
				let i = new Image(); 

				i.onload = () => {
					let string:any = (i.width/i.height).toFixed(2);
					string = string.split('.');
					this.font_size = (parseInt(string[1]) - 7).toString();
					console.log(this.font_size);
					this.addTextWatermark();
				};
				i.src = picture; 
			});
			this.showHide = true;
		}, (err) => {
			console.log(err);
		});
	}

	addTextWatermark() {

		let x = (boat, metrics, context, target) =>{
			return 10;
		}
		let y = (boat, metrics, context) =>{
			console.log(context);
			return context.canvas.height - 180;
		}
		let x2 = (boat, metrics, context, target) =>{
			return 10;
		}
		let y2 = (boat, metrics, context) =>{
			return context.canvas.height - 90;
		}

		let xLatLong = (boat, metrics, context) =>{
			return 10;
		}
		let yLatLong = (boat, metrics, context) =>{
			return context.canvas.height - 10;
		}

		watermark([this.blobImage])
		  .dataUrl(watermark.text.atPos(x,y, this.address.slice(0,30), this.font_size+'px Arial', '#ec0b0b', 1))
		  .render()
		  .dataUrl(watermark.text.atPos(x2,y2, this.address.slice(30,this.address.length), this.font_size+'px Arial', '#ec0b0b', 1))
		  .render()
		  .dataUrl(watermark.text.atPos(xLatLong,yLatLong, this.lat+' | '+this.long, this.font_size+'px Arial', '#ec0b0b', 1))
		  .then(img => {
			  	let fileName = "IMG_"+Math.random().toString().split('.')[1]+".jpeg";
			  	this.storeData(fileName,this.lat,this.long,this.address);
				this.writeFile(img, "geo_captured", fileName);
		  });
	}

	getLocation(){
		this.apiService.presentLoading().then(()=>{
			this.geolocation.getCurrentPosition().then((resp) => {
				this.lat = resp.coords.latitude;
				this.long = resp.coords.longitude;
				let data = {
					lat: resp.coords.latitude,
					long: resp.coords.longitude
				}
				this.apiService.getAdress(data).then((result:any)=>{
					this.address = result.address;
					this.apiService.loading.dismiss();
				});
			}).catch((error) => {
				this.apiService.loading.dismiss();
				console.log('Error getting location', error);
			});
		});
		
		// let watch = this.geolocation.watchPosition();
		// watch.subscribe((data) => {
		// 	// data can be a set of coordinates, or an error (if an error occurred).
		// 	// data.coords.latitude
		// 	// data.coords.longitude
		// 	console.log(data);
		// });
	}

	public writeFile(base64Data: any, folderName: string, fileName: any) {  
		let contentType = this.getContentType(base64Data);  
		let DataBlob = this.base64toBlob(base64Data, contentType);  
		this.file.checkDir(this.file.externalRootDirectory, folderName).then(response => {
			let filePath = this.file.externalRootDirectory + folderName;  
			this.file.writeFile(filePath, fileName, DataBlob, contentType).then((success) => {  
				console.log("File Writed Successfully", success);  
			}).catch((err) => {  
				console.log("Error Occured While Writing File", err);  
			});
		}).catch(err=>{
			this.file.createDir(this.file.externalRootDirectory, folderName,false).then(response => {
				let filePath = this.file.externalRootDirectory + folderName;  
				this.file.writeFile(filePath, fileName, DataBlob, contentType).then((success) => {  
					console.log("File Writed Successfully", success); 
					this.apiService.presentToast('Picture saved in gallery'); 
				}).catch((err) => {  
					console.log("Error Occured While Writing File", err);  
				});
			}).catch(err => {
				// console.log('Directory no create'+JSON.stringify(err));
			}); 
		});
		
	}  

	public getContentType(base64Data: any) {  
		let block = base64Data.split(";");  
		let contentType = block[0].split(":")[1];  
		return contentType;  
	}  

	//here is the method is used to convert base64 data to blob data  
	public base64toBlob(b64Data, contentType) {  
		contentType = contentType || '';  
		let sliceSize = 512;  
		let byteCharacters = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));  
		let byteArrays = [];  
		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {  
			let slice = byteCharacters.slice(offset, offset + sliceSize);  
			let byteNumbers = new Array(slice.length);  
			for (let i = 0; i < slice.length; i++) {  
				byteNumbers[i] = slice.charCodeAt(i);  
			}  
			var byteArray = new Uint8Array(byteNumbers);  
			byteArrays.push(byteArray);  
		}  
		let blob = new Blob(byteArrays, {  
			type: contentType  
		});  
		return blob;  
	}  

	goBack(){
		this.cameraPreview.stopCamera();
		this.navCtrl.navigateBack('home',{animationDirection: 'back'});
	}


	storeData(image,lat,long,address){
		let imageArray:any = localStorage.getItem('images');
		if(imageArray == null){
			imageArray = [];
			let object = {};
			object['image'] = image;
			object['lat'] = lat;
			object['long'] = long;
			object['address'] = address;
			let date = new Date;
			object['time'] = date.getDate()+'-'+(date.getMonth() + 1)+'-'+date.getFullYear();
			imageArray.push(object);
		}else{
			imageArray = JSON.parse(imageArray);
			let object = {};
			object['image'] = image;
			object['lat'] = lat;
			object['long'] = long;
			object['address'] = address;
			let date = new Date;
			object['time'] = date.getDate()+'-'+(date.getMonth() + 1)+'-'+date.getFullYear();
			imageArray.push(object);
		}
		localStorage.setItem('images',JSON.stringify(imageArray));
	}
}
