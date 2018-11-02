import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StillceServicesProvider } from '../../providers/stillce-services/stillce-services';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
    tasks: any = []
    users: any = []
    projects: any = []
    dateMin:any
    dateMax:any
    what:string = "attachedToMe"
    show_form: boolean = false

    private task : FormGroup;
    project: AbstractControl
    date: AbstractControl
    attachedTo: AbstractControl
    description: AbstractControl

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private ce: StillceServicesProvider, public http: Http) {
        // this.dateMin = new Date()
        // let res = this.dateMin.getTime() + (7*24*60*60*1000)
        // this.dateMax = new Date(res)
        // console.log(this.dateMin, this.dateMax, res)

        this.task = this.formBuilder.group({
            description: ['', Validators.required],
            attachedTo: ['', Validators.required],
            date: ['', Validators.required],
            project: ['', Validators.required],
            creator: [''],
        })

        this.project = this.task.controls['project']
        this.date = this.task.controls['date']
        this.attachedTo = this.task.controls['attachedTo']
        this.description = this.task.controls['description']

        this.getTasks()
        this.getProjects()
        this.getUsers()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TaskPage');
    }

    segmentChanged(e){
        console.log(e)
        this.getTasks()
    }

    showForm(){
        this.show_form = (this.show_form == true) ? false : true
    }
    
    add(){
        console.log('add task')
    }

    logForm(){
        this.task.value.creator = 1
        console.log(this.task.value)
        this.addTask()
    }

    getTasks() {
		this.http.get(this.ce.url + 'task/'+this.what+'/'+1).map(res => res.json()).subscribe(
			data => {
                console.log('getTasks :', data)
                this.tasks = data
			},
			err => {
                console.log("Oops!")
			}
		)
    }

    getProjects() {
		this.http.get(this.ce.url + 'project/').map(res => res.json()).subscribe(
			data => {
                console.log('getProjects :', data)
                this.projects = data
			},
			err => {
				console.log("Oops!")
			}
		)
    }

    getUsers() {
		this.http.get(this.ce.url + 'user/').map(res => res.json()).subscribe(
			data => {
                console.log('getUsers :', data)
                this.users = data
			},
			err => {
				console.log("Oops!")
			}
		)
    }

    addTask(){
        this.ce.presentLoading()
        this.http.post(
            this.ce.url + 'task/', this.task.value ).map(res => res.json()).subscribe(
            data => {
                console.log('tasks', data)
                this.tasks = data
                this.showForm()
                this.ce.loadingDismiss()
            },
            err => {
                console.log("Oops!", err)
                this.ce.loadingDismiss()
            }
        )
    }
    

}
