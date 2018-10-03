import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-task',
    templateUrl: 'task.html',
})
export class TaskPage {
    dateMin:any
    dateMax:any
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // this.dateMin = new Date()
        // let res = this.dateMin.getDate() + (7*24*60*60*1000)
        // this.dateMax = new Date(res)
        // console.log(this.dateMin, this.dateMax, res)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TaskPage');
    }

}
