import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ApiService } from '../api.service';
import { File } from '@ionic-native/file/ngx';

@Component({
  	selector: 'app-start-recording',
  	templateUrl: './start-recording.page.html',
  	styleUrls: ['./start-recording.page.scss'],
})
export class StartRecordingPage implements OnInit {

  	constructor(private cameraPreview: CameraPreview, private geolocation: Geolocation) { }

  	ngOnInit() {
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

	startRecording(){
		// this.cameraPreview.startRecordVideo();
	}
}