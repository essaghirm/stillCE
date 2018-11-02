import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StillceServicesProvider } from '../../providers/stillce-services/stillce-services';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ProjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})
export class ProjectDetailPage {
  project:any
  services:any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private ce: StillceServicesProvider, public http: Http) {
    this.project = this.navParams.data.project
    this.getServicesByProject(this.project.id)
    // console.log(this.project)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectDetailPage');
  }

  getServicesByProject(id) {
    this.http.get(this.ce.url + 'service/project/'+id).map(res => res.json()).subscribe(
        data => {
            console.log('getServicesByProject :', data)
            this.services = data
        },
        err => {
            console.log("Oops!")
        }
    )
}

}
