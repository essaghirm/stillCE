import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

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

    private task : FormGroup;
    project: AbstractControl
    date: AbstractControl
    who: AbstractControl
    description: AbstractControl

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
        // this.dateMin = new Date()
        // let res = this.dateMin.getTime() + (7*24*60*60*1000)
        // this.dateMax = new Date(res)
        // console.log(this.dateMin, this.dateMax, res)

        this.task = this.formBuilder.group({
            description: ['', Validators.required],
            who: ['', Validators.required],
            date: ['', Validators.required],
            project: ['', Validators.required],
        })

        this.project = this.task.controls['project']
        this.date = this.task.controls['date']
        this.who = this.task.controls['who']
        this.description = this.task.controls['description']
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TaskPage');
    }

    segmentChanged(e){

    }
    
    add(){
        console.log('add task')
    }

    logForm(){
        console.log(this.task.value)
    }

}
