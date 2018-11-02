import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the StillceServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StillceServicesProvider {
  url: string = "http://127.0.0.1:8000/"
  loading: any
  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    // console.log('Hello StillceServicesProvider Provider');
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
    }, 15000);
  }

  loadingDismiss() {
    this.loading.dismiss()
  }

}
