import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export enum ConnectionStatusEnum {
    Online,
    Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkProviderService {
	private sub = new Subject<any>();
  	constructor() {}


	publishSomeData(data: any) {
		this.sub.next(data);
	}
  
	getObservable(): Subject<any> {
		return this.sub;
	}
}
